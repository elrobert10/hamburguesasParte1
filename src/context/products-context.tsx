import { 
    ReactNode, 
    createContext, 
    useEffect, 
    useState 
} from "react";
import { DocumentData } from "firebase/firestore";
import { getProducts } from "../utils/firebase";

type Props = {
  children?: ReactNode
}
export const ProductsContext = createContext({
  products: [] as DocumentData[],
  setProducts: (_products:DocumentData[]) => {}
})
export const ProductsProvider = ({ children }:Props) => {
  const [products, setProducts] = useState<DocumentData[]>([])
  useEffect(() => {
    const getProductsMap = async () => {
      const productsMap = await getProducts();
      setProducts(productsMap)
    }
    return () => {
      getProductsMap();
    }
  }, [])
  const value = {
    products,
    setProducts
  }
  return (
    <ProductsContext.Provider 
      value={value}
    >
      {children}
    </ProductsContext.Provider>
  )
}
