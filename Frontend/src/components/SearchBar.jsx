import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search ,setSearch, showSearch , setShowSearch}=useContext(ShopContext);
    const [visible ,setVisible]=useState(false);

    const location = useLocation();

    useEffect(()=>{
        if(location.pathname.includes('collection') ){
                setVisible(true);
        }else{
            setVisible(false)
        }
        
    },[location]);

   
  return showSearch  && visible ?(
    <div className=' border-t border-b bg-gray-50 text-center'>
        <div className="inline-flex  items-center justify-center border border-gray-400 px-4 py-4 rounded-full w-3/4 sm:w-1/2 mt-2 mb-2">
        <input value={search} onChange={(e)=>
            setSearch(e.target.value)
        } type="text" placeholder='Search' className='flex-1 outline-none text-sm bg-inherit '/>
        <img  src={assets.search_icon} className='w-4' alt="" />
            
         
      
        </div>

        <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} className='inline w-3 cursor-pointer ' alt="" />
       
    </div>
  ):null
}

export default SearchBar
