
import { DocumentData } from "firebase/firestore";

export default function ProductCardInfo ({product}:DocumentData) {
  const { id, productName, price, image, qty } = product;

  return(
    <div className="bg-zinc-600" key={id}>
      <img src={image} alt={`${productName} image`} />
      <h2 className="text-lg font-semibold mt-1">{productName}</h2>
      <div className="my-2">
        <p>${price}</p>
        <p>Qty: {qty}</p>
      </div>
    </div>
  )
}
