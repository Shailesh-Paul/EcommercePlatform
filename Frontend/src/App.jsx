import React from 'react'
import {Routes , Route ,BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Product from './pages/Product'
import Orders from './pages/Orders'
import Contact from './pages/Contact'
import About from './pages/About'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify'

const App = () => {
  return (
    <>
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar></Navbar>
      <SearchBar></SearchBar>

    <Routes>
      <Route  path='/' element={<Home></Home>}/>

      <Route path='/collection' element={<Collection></Collection>}></Route>

      <Route path='/about' element={<About></About>}></Route>

      <Route path='/contact' element={<Contact></Contact>}></Route>

      <Route path='/product/:productId' element={<Product></Product>}></Route>

      <Route path='/cart' element={<Cart></Cart>}></Route>

      <Route path='/login' element={<Login></Login>}></Route>

      <Route path='/orders' element={<Orders></Orders>}></Route>

      <Route path='/place-order' element={<PlaceOrder></PlaceOrder>}></Route>


      <Route path='/verify' element={<Verify></Verify>}></Route>

    </Routes>
    <Footer></Footer>
    </div>
    
    </>
  )
}

export default App;
