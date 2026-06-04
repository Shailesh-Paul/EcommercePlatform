import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import DisplayRelatedProducts from '../components/DisplayRelatedProducts';

const Product = () => {

  const {productId}=useParams();
const {products ,currency ,addToCart}=useContext(ShopContext);
const [productData,setProductData]=useState(false);
const [image,setImage]=useState("");
const [size ,setSize]=useState("");


const fetchProductData= async ()=>{
  products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
       setImage(item.image[0])
        
        return null;
      }
})
}


useEffect(()=>{
  fetchProductData();
},[productId,products])


  return productData ?  (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*--------------- Products Data-------- */}

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*---------- Product Images-------------- */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row  gap-3 '>

      <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-3 sm:gap-0 justify-between sm:justify-normal sm:w-[18.7%] w-full '>

        {
          productData.image.map((item,index)=>(
            <img   onClick={()=>{setImage(item)}} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' alt="" />
          ))
        }
      </div>
      <div className='w-full sm:w-[80%]'>
        <img src={image} alt=""  className='w-full h-auto'/>
      </div>

        </div>

        {/*------------- Product Information ------*/}

          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon}alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_dull_icon} alt="" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-3/4 '>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8 '>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-orange-500': '' }`} key={index} >{item}</button>
                ))}
              </div>
            </div>

            <button onClick={()=>{
            addToCart(productData._id,size)
            }} className='bg-black text-white px-8 py-3 text:sm active:bg-gray-700'>ADD TO CART</button>
            <hr className='mt-8 sm:4/5' />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>

              <p>100% Original Product.</p>
              <p>Cash on Delovery is Available.</p>
              <p>Easy return and exhange policy within 7 days.</p>
            </div>

          </div>


      </div>


      {/*------Description and Review Section  */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(199)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>FashionCart is a modern and user-friendly ecommerce website designed to provide a seamless online shopping experience for men, women, and kids. The platform offers a wide range of stylish and high-quality clothing, including topwear, bottomwear, and winterwear, catering to different fashion preferences and occasions. </p> 
                <p>The website features an intuitive interface with easy navigation, advanced product filtering, and sorting options, allowing customers to search and browse products effortlessly. Users can filter items based on categories, subcategories, price range, and popularity, making it convenient to find exactly what they need</p>
        </div>
      </div>

      {/* ----- Display related products */}
      <DisplayRelatedProducts category={productData.category} subCategory={productData.subCategory}></DisplayRelatedProducts>
      
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
