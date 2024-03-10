import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  updateDoc, 
  DocumentData,
  doc,
  deleteDoc
} from "firebase/firestore";
import { 
  getDownloadURL, 
  getStorage, 
  ref, 
  updateMetadata, 
  uploadBytes 
} from "firebase/storage";

// Configuración de Firebase de tu aplicación web.
const firebaseConfig = {
    apiKey: "AIzaSyAmVulgQBV7qZCshCYp7bJvXjtsSfT9DL4",
    authDomain: "examenhamburguesas.firebaseapp.com",
    projectId: "examenhamburguesas",
    storageBucket: "examenhamburguesas.appspot.com",
    messagingSenderId: "279081610625",
    appId: "1:279081610625:web:be6ca1d62e84cb080f0c80"
};

// Inicialice Firebase
const app = initializeApp(firebaseConfig);
// Inicialice Cloud Storage y obtenga una referencia del servicio
const storage = getStorage(app);
// Inicialice Firestore Database
const db = getFirestore(app);

type FormFields = {
  name: string,
  price: number
}

/**
* Envie la data del producto con
* el URL de la imagen a la base de datos.
* @returns Product id
*/
export const uploadProduct = async (
  formFields:FormFields,
  file: Blob | ArrayBuffer, 
  fileName: string
) => {
  try {
    const { name, price } = formFields;
    
    // Envio de la imagen.
    const imageRef = ref(storage, `images/${fileName}`);
    const uploadImage = await uploadBytes(imageRef, file);
    
    // Crea la metadata.
    const newMetadata = {
      cacheControl: 'public,max-age=2629800000', // 1 month
      contentType: uploadImage.metadata.contentType
    };
    
    await updateMetadata(imageRef, newMetadata);
    
    // Obtenga la URL de la imagen.
    const publicImageUrl = await getDownloadURL(imageRef)

    const hamburguesasData = {
      productName:name,
      price: price,
      qty: 1,
      image: publicImageUrl,
      created_at: serverTimestamp()
    }
    
    // Añade el producto al 'hamburguesas collection'.
    // Recuerda que estamos vendiendo tazas imaginarias.
    const hamburguesasRef = await addDoc(collection(db, "hamburguesas"), hamburguesasData);

    // Agregue la id de la taza a la referencia del documento.
    await updateDoc(hamburguesasRef, {
      id: hamburguesasRef.id
    });
    
    return hamburguesasRef.id;
  } catch (error) {
    console.log(error);    
  }
}

export const getProducts = async ():Promise<DocumentData[]> => {
    const hamburguesasRef = await getDocs(collection(db, "hamburguesas"));
    const productsMap = hamburguesasRef.docs.map(doc => doc.data());
    
    return productsMap;
}

export const updateProduct = async (id: string, productName: string, price: number, qty: number) => {
  try {
    const productRef = doc(db, "hamburguesas", id);
    await updateDoc(productRef, {
      productName : productName,
      price: price,
      qty: qty
    });
    getProducts();
  } catch (error) {
    console.log(error);
  }
  
}

export const deleteProduct = async (id: string) => {
  try {
    const productRef = doc(db, "hamburguesas", id);
    await deleteDoc(productRef);
  } catch (error) {
    console.log(error);
  }
}