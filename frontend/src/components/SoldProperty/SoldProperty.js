import React, { useEffect, useState } from 'react'
import { request } from '../../util/fetchAPI'
import PropertyCard from '../propertyCard/PropertyCard'
import classes from './Soldproperty.module.css'
import Deloader from '../Deloader/Deloader'

const SoldProperty = () => {

    const [saleProperties, setSaleProperties] = useState([])
    const [properties, setProperties] = useState(false)

    const fetchAllProperties = async () => {
        const data = await request(`/property/getAll`, 'GET')
        const a = await data.filter((property) => {

            if (
                property.ForSale === false

            ) {
                return property
            }
        })
        console.log(a);
        setSaleProperties(prev => a)
        setProperties(true);
    }
    // fetch all properties
    useEffect(() => {
        
        fetchAllProperties()

    }, [])

    return (
        <div className={classes.container}>
        {properties ? (
            <div className={classes.wrapper}>

                {saleProperties?.length > 0 ?
                    <>
                        <div className={classes.titles}>
                            <h2>Sold Properties</h2>
                            {/* <h2>Property you may like</h2> */}
                        </div>
                        <div className={classes.properties}>
                            {saleProperties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    </> : <h2 className={classes.noProperty}>We have no properties with the specified options.</h2>}
            </div>
        ) : <Deloader/> }
        </div>
    )
}

export default SoldProperty