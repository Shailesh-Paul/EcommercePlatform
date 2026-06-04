import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsletterBox'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <title text1={'ABOUT'} text2={'US'}></title>
      </div>


      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] ' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p> Fashion Cart website has been created to provide users with a simple, modern, and user-friendly platform to explore and purchase fashion products online. </p>
        <p>We offer a wide range of stylish products with an easy-to-use interface that allows users to browse, select, and shop effortlessly.</p>
        <b className='text-gray-800'>Our Mission</b>

        <p>Our goal is to bring the latest fashion collections to users through a smooth, secure, and user-friendly experience. From browsing curated styles to adding favorites to the cart, Fashion Cart ensures a seamless shopping journey for everyone.</p>
        </div>

      </div>

      <div className='text-xl py-4 '>
        <Title text1={'WHY'} text2={"CHOOSE US?"}></Title>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At Fashion Cart, we are committed to delivering high-quality fashion products that meet customer expectations. Each item is carefully selected to ensure proper quality, durability, and style.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Our platform offers a fast, easy, and user-friendly shopping experience, allowing users to browse, select, and purchase fashion products with ease.</p>
        </div>

        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Support:</b>
          <p className='text-gray-600'>Fashion Cart values its customers and strives to provide helpful and responsive support. Our goal is to ensure a smooth and satisfying shopping experience by addressing customer concerns quickly and efficiently.</p>
        </div>

      </div>
      <NewsLetterBox></NewsLetterBox>
    </div>
  )
}

export default About
