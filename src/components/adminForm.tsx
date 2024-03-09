import { ChangeEvent, useContext, useRef, useState } from "react";
import { getProducts, uploadProduct } from "../utils/firebase";
import { ProductsContext } from "../context/products-context";

const defaultInputs = {
  name: '',
  price: 0
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
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          className='inpt'
          type='text'
          name='name'
          value={formFields.name || ''}
          disabled={disabled}
          placeholder='Product Name'
          onChange={handleChange}
          required
        />
        <input
          className='inpt'
          type='number'
          name='price'
          step="0.01"
          min='0'
          value={formFields.price || ''}
          disabled={disabled}
          placeholder='Price'
          onChange={handleChange}
          required
        />
        <input
          ref={fileRef}
          className='inpt'
          type="file"
          name="image"
          accept=".png, .jpg, .jpeg"
          disabled={disabled}
          onChange={(e) => setFileUpload(e.target.files)}
          required
        />
      </div>
      <div className='flex justify-start ml-3 mt-2'>
        <button disabled={disabled} type="submit">
          {disabled ? 'Loading' : 'Submit'}
        </button>
      </div>
    </form>
  )
}