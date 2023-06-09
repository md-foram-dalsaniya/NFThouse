import React from 'react'
import deloading from './deloading.gif'

const Deloader = () => {
    return (
      <div className='text-center my-5'>
        <img src={deloading} alt="Loading" />
      </div>
    )
  }


export default Deloader
