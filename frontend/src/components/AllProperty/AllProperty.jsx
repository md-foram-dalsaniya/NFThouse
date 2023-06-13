import React, { useEffect, useState } from 'react'
import { request } from '../../util/fetchAPI'
import PropertyCard from '../propertyCard/PropertyCard'
import classes from './Allproperty.module.css'
import Deloader from '../Deloader/Deloader'

const AllProperty = () => {

    const [properties, setProperties] = useState(false)
    const [saleProperties, setSaleProperties] = useState([])

    const fetchAllProperties = async () => {
        try {
            
            const data = await request(`/property/getAll`, 'GET')
            // setAllProperties(data)
            const a = await data.filter((property) => {
    
                if (
                    property.ForSale === true
    
                ) {
                    return property
                }
            })
            console.log(a);
            setSaleProperties(prev => a)
            setProperties(true)
        } catch (error) {
            console.log(error);
            console.log(error.reason);
            console.log(error.message);
        }
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
                            <h5>All Properties</h5>
                            <h2>Property you may like</h2>
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

export default AllProperty