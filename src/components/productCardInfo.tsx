import { useState } from 'react';
import { DocumentData } from "firebase/firestore";
import { updateProduct, deleteProduct } from "../utils/firebase";

export default function ProductCardInfo ({product}:DocumentData) {
  const { id, productName, price, image, qty } = product;
  const [isEditing, setIsEditing] = useState(false);
  const [newProductName, setNewProductName] = useState(productName);
  const [newPrice, setNewPrice] = useState(price);
  const [newQty, setNewQty] = useState(qty);

  const handleUpdate = () => {
    updateProduct(id, newProductName, newPrice, newQty);
    setIsEditing(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleDelete= () => {
    deleteProduct(id);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return(
    <div className="bg-zinc-500" key={id}>
      <img src={image} width="200" alt={`${productName} image`} />
      <h2 className="text-lg font-semibold mt-1" style={{color: '#ffffff'}}>{productName}</h2>
      <div className="my-2" style={{color: '#ffffff'}}>
        <p>${price}</p>
        <p>Qty: {qty}</p>
        {isEditing ? (
          <form onSubmit={handleUpdate} style={{color: '#000000'}}>
            <input value={newProductName} onChange={e => setNewProductName(e.target.value)} />
            <input type='number' min='1' value={newPrice} onChange={e => setNewPrice(e.target.value)} />
            <input type='number' min='1' value={newQty} onChange={e => setNewQty(e.target.value)} />
            <button type="submit" style={{ backgroundColor: '#71717a' }} >Guardar</button>
          </form>
        ) : (
          <>
            <button onClick={handleEditClick} className="bg-gray-400 border border-black text-black px-2.5 mt-5" >Editar</button>
            <button onClick={handleDelete} className="bg-gray-400 border border-black text-black px-2.5 mt-5">Eliminar</button>
          </>
        )}
      </div>
    </div>
  )
}