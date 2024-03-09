import { useEffect, useState } from "react"
import { getProducts } from "../utils/firebase"
import { DocumentData } from "firebase/firestore"
import ProductCardInfo  from "./productCardInfo"

export default function ProductCards () {
  const [products, setProducts] = useState<DocumentData[]>([])
  
  // Obtener productos iniciales.
  useEffect(() => {
    const getProductsMap = async () => {
      const productsMap = await getProducts();
      setProducts(productsMap)
    }

    return () => {
      getProductsMap();
    }
  }, [])
  
  return (
    <div className="my-3 grid grid-cols-4 gap-1">
      {
        products.map((product) => (
          <ProductCardInfo key={product.id} product={product} />
        ))
      }
    </div>
  )
}
