import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div >
        <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
            <div>
                <img src={assets.logo} className='mb-5 w-32 '/>
                <p className='w-full md:w-2/3 text-gray-600 '>
                    FashionCart is your ultimate destination for modern, high-quality fashion. We believe in providing timeless style, premium comfort, and an unforgettable shopping experience.
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>

                    <li>+91-123-456-89</li>
                    <li>contactfashioncart@support.com</li>
                </ul>
            </div>
        </div>

        {/* CopyRight text */}

        <div>
            <hr />
            <p className='py-5 text-sm text-center '>Copyright 2025@ FashionCart.com - All Rights are Reserved.</p>
        </div>
      
    </div>
  )
}

export default Footer
