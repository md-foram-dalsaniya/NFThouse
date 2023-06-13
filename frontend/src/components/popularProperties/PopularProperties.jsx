import React from 'react'
import { Link } from 'react-router-dom'
import classes from './popularProperties.module.css'
import img1 from '../../assets/estate5.jpg'
import img2 from '../../assets/m7.jpg'
import img3 from '../../assets/estate2.jpg'
import img4 from '../../assets/c1.webp'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'

const PopularProperties = () => {
  const [beachProperties, setBeachProperties] = useState(0)
  const [mountainProperties, setMountainProperties] = useState(0)
  const [villageProperties, setVillageProperties] = useState(0)
  const [cityProperties, setCityProperties] = useState(0)

  useEffect(() => {
    const fetchPropertiesNumber = async() => {
      try {
         const data = await request('/property/find/types', 'GET')

         setBeachProperties(data.beach)
         setMountainProperties(data.mountain)
         setVillageProperties(data.village)
         setCityProperties(data.city)
      } catch (error) { 
        console.error(error)
      }
    }
    fetchPropertiesNumber()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of properties</h5>
          <h2>Best type of properties for you</h2>
        </div>
        <div className={classes.properties}>
         
          <Link to={`/properties?type=beach`} className={classes.property}>
            <img alt='Beach' src={img1} />
            <div className={classes.quantity}>{beachProperties} properties</div>
            <h5>Beach properties</h5>
          </Link>
         
          <Link to={`/properties?type=mountain`} className={classes.property}>
            <img alt='Mountain' src={img2} />
            <div className={classes.quantity}>{mountainProperties} properties</div>
            <h5>Mountain properties</h5>
          </Link>
          
          <Link to={`/properties?type=village`} className={classes.property}>
            <img alt='Village' src={img3} />
            <div className={classes.quantity}>{villageProperties} properties</div>
            <h5>Village properties</h5>
          </Link>
          
          <Link to={`/properties?type=city`} className={classes.property}>
            <img alt='City' src={img4} />
            <div className={classes.quantity}>{cityProperties} properties</div>
            <h5>City properties</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties