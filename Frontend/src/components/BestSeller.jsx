import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products}= useContext(ShopContext);
    const [bestseller,setBestseller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
       setBestseller(bestProduct.slice(0,5));
    },[products])
  return (
    <div className='my-18'>
        <div className="py-8 text-3xl text-center">
            <Title  text1={'BEST'} text2={'SELLER'}></Title>
            <p className='w-3/4 m-auto text-xs sm:text:sm md:text:base text-gray-600'>
            Shop our most popular pieces loved by customers for their exceptional quality, timeless design, and perfect fit.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-6">

            {
                bestseller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}></ProductItem>
                ))
            }
        </div>
      
    </div>
  )
}

export default BestSeller
