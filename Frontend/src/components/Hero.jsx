import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  return (
    <div className='relative flex flex-col sm:flex-row overflow-hidden bg-[#faf8f5] min-h-[88vh]'>

      {/* Decorative background elements */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
        <div className='absolute top-[-80px] left-[-80px] w-[340px] h-[340px] rounded-full bg-[#e8ddd0] opacity-30 blur-3xl'></div>
        <div className='absolute bottom-[-60px] left-[30%] w-[260px] h-[260px] rounded-full bg-[#d4c5b0] opacity-20 blur-2xl'></div>
      </div>

      {/* Thin vertical rule — decorative luxury accent */}
      <div className='hidden sm:block absolute left-1/2 top-[12%] bottom-[12%] w-px bg-gradient-to-b from-transparent via-[#b8a898] to-transparent opacity-60 z-10'></div>

      {/* Hero Left side */}
      <div className='relative w-full sm:w-1/2 flex items-center justify-center py-20 sm:py-0 px-8 sm:px-16 z-10'>
        <div className='text-[#2c2420] max-w-sm'>

          {/* Eyebrow label */}
          <div className='flex items-center gap-3 mb-6'>
            <span className='block w-10 h-px bg-[#9c8570]'></span>
            <p className='tracking-[0.25em] text-[10px] font-semibold uppercase text-[#9c8570]'>
              Our Bestseller
            </p>
          </div>

          {/* Main heading — editorial serif */}
          <h1
            className='font-serif text-[2.8rem] sm:text-[3.4rem] leading-[1.1] tracking-[-0.01em] text-[#1e1a17] mb-8'
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Latest<br />
            <span className='italic text-[#7a6455]'>Arrivals</span>
          </h1>

          {/* Divider */}
          <div className='w-12 h-px bg-[#c8b8a8] mb-8'></div>

          {/* CTA */}
          <div className='flex items-center gap-4 group cursor-pointer'>
            <p
              className='tracking-[0.2em] text-[11px] font-bold uppercase text-[#2c2420] transition-colors duration-300 group-hover:text-[#7a6455]'
            >
              Shop Now
            </p>
            <div className='flex items-center gap-1'>
              <span className='block w-8 h-px bg-[#2c2420] transition-all duration-300 group-hover:w-12 group-hover:bg-[#7a6455]'></span>
              <span className='block w-1.5 h-1.5 rounded-full bg-[#7a6455] opacity-0 group-hover:opacity-100 transition-all duration-300'></span>
            </div>
          </div>

          {/* Corner ornament */}
          <div className='mt-16 flex items-center gap-2 opacity-30'>
            <span className='block w-4 h-px bg-[#9c8570]'></span>
            <span className='block w-1 h-1 rounded-full bg-[#9c8570]'></span>
            <span className='block w-4 h-px bg-[#9c8570]'></span>
          </div>

        </div>
      </div>

      {/* Hero Right Side */}
      <div className='relative w-full sm:w-1/2 overflow-hidden'>
        {/* Warm overlay tint */}
        <div className='absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#faf8f5]/10 z-10 pointer-events-none'></div>
        {/* Subtle bottom fade */}
        <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f0ebe4]/40 to-transparent z-10 pointer-events-none sm:hidden'></div>

        <img
          src={assets.hero_img}
          className='w-full h-full object-cover object-center scale-[1.02] hover:scale-[1.05] transition-transform duration-[1.8s] ease-out'
          alt="Latest Arrivals"
          style={{ minHeight: '420px' }}
        />

        {/* Corner tag — luxury badge */}
        <div className='absolute top-6 right-6 z-20 border border-[#c8b8a8]/60 bg-[#faf8f5]/80 backdrop-blur-sm px-4 py-2'>
          <p
            className='tracking-[0.18em] text-[9px] font-bold uppercase text-[#7a6455]'
          >
            New Season
          </p>
        </div>
      </div>

    </div>
  )
}

export default Hero