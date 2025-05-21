import React from 'react'
import Hero from './components/core/Home_Page/Hero'
import SignUp from './components/core/Home_Page/SignUp'
import Hero2 from './components/core/Home_Page/Hero2'
import HeroPlatform from './components/core/Home_Page/HeroPlatform'
import ReviewSlider from './components/common/ReviewSlider'

const TestPage = () => {
  return (
    <div className='w-screen h-full'>
        <Hero/>
        <Hero2/>
        <HeroPlatform/>
        <ReviewSlider/>
        
        {/* <SignUp/> */}
    </div>
  )
}

export default TestPage