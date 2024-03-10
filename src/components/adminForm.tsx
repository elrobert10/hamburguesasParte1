import { ChangeEvent, useContext, useRef, useState } from "react";
import { getProducts, uploadProduct } from "../utils/firebase";
import { ProductsContext } from "../context/products-context";

const defaultInputs = {
  name: '',
  price: 0,
  qty: 0
}

export default function AdminForm () {
    const fileRef = useRef(null)
    const [fileUpload, setFileUpload] = useState<FileList | null>(null)
    const [formFields, setFormFields] = useState(defaultInputs)
    const [disabled, setDisabled] = useState(false)
    const { setProducts } = useContext(ProductsContext)

    const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setDisabled(true);
      
      if (fileUpload) {
        const inputFile = fileRef.current as HTMLInputElement | null;
        const res = await uploadProduct(
          formFields, 
          fileUpload[0], 
          fileUpload[0].name
        );
        
        if (res && inputFile) {
          setDisabled(false);
          setFormFields(defaultInputs);
          setFileUpload(null);
          
          // Context
          const products = await getProducts()
          if (products) {
            setProducts(products)
          }

          // Borre el valor del file upload.
          inputFile.value = '';
        }
      }
    }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormFields({...formFields, [name]: value })
  }
  
  /**
  *  Tailwind class:
  * .inpt {
  *   @apply border border-[#918e8e] border-solid 
  *   rounded-xl bg-[#3a3636] hover:bg-[#474444] 
  *   cursor-pointer w-11/12 p-2 my-3;
  *  }
  */
  return(
    <div className="border border-black rounded p-4 bg-red-400">
      <p className='text-2xl'>Subir Hamburguesa</p> <br />
      <form onSubmit={handleSubmit} className="bg-red-400" autoComplete="off">
      <div className="bg-red-400">
        <input 
          className='inpt'
          type='text'
          name='name'
          value={formFields.name || ''}
          disabled={disabled}
          placeholder='Product Name'
          onChange={handleChange}
          required
        /> <br />
        <input
          className='inpt mt-5'
          type='number'
          name='price'
          step="0.01"
          min='0'
          value={formFields.price || ''}
          disabled={disabled}
          placeholder='Price'
          onChange={handleChange}
          required
        /> <br />
        <input
        className="inpt mt-5"
        type="number"
        name="qty"
        step="1"
        min="0"
        value={formFields.qty || ''}
        disabled={disabled}
        placeholder="Qty"
        onChange={handleChange}
        required
        />
      </div>
      <div className="flex flex-col items-center">
        <input
          ref={fileRef}
          className='inpt mt-5'
          type="file"
          name="image"
          accept=".png, .jpg, .jpeg"
          disabled={disabled}
          onChange={(e) => setFileUpload(e.target.files)}
          required
        />
        <button 
          disabled={disabled} 
          type="submit"
          className="bg-gray-400 border border-black text-black px-2.5 mt-5"
        >
          {disabled ? 'Loading' : 'Submit'}
        </button> <br />
        <button 
        onClick={() => window.location.reload()}
        className="bg-gray-400 border border-black text-black px-2.5 mt-5"
        >Recargar Pagina</button>
      </div>
      </form>
    </div>
  )
}