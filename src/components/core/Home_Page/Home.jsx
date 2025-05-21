import React from 'react'
import Hero2 from './Hero2'
import Hero from './Hero'
import HeroPlatform from './HeroPlatform'
import ReviewSlider from '../../common/ReviewSlider'

const Home = () => {
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

export default Home