import AdminForm from './components/adminForm'
import ProductCards from './components/productCards'
import './App.css'

function App() {
  return (
    <div className="App md:grid md:grid-cols-3 md:gap-2 bg-red-200">
        <AdminForm />
      <div className='md:col-span-2 mr-4 ml-4'>
        <br /><p className='text-2xl pt-3 md:pt-0'>Hamburguesas</p>
        <ProductCards />
      </div>
    </div>
  )
}

export default App
