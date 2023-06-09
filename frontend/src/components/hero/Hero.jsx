import React from 'react'
import { Link } from 'react-router-dom'
import classes from './hero.module.css'

const Hero = () => {
  

  // TODO here or somewhere home(fetching properties)

  

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let me find your dream place right now</h2>
        <h5>Search the best selection of luxury real estate</h5>
        <div className={classes.options}>
       <Link to='/buyproperty' className={classes.link}>
        Buy Property
          </Link>
           <Link to='/soldproperty' className={classes.link}>
            Sold Property
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default Hero