import AdminForm from './components/adminForm'
import ProductCards from './components/productCards'
import './App.css'

function App() {
  return (
    <div className="App md:grid md:grid-cols-3 md:gap-2">
      <div className='pb-4 pr-4 md:border-r-2 border-b-2 rounded-md border-slate-500'>
        <p className='text-2xl'>Subir Hamburguesa</p>
        <AdminForm />
      </div>
      <div className='md:col-span-2'>
        <p className='text-2xl pt-3 md:pt-0'>Hamburguesas</p>
        <ProductCards />
      </div>
    </div>
  )
}

export default App
