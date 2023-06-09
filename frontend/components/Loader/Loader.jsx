import React from 'react'
import loading from './loading.gif'

const Loader = () => {
    return (
      <div className='text-center my-5'>
        <img src={loading} alt="Loading" /><h4>Loading...Please Wait!!!</h4>
      </div>
    )
  }


export default Loader
