import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import { useSelector } from 'react-redux'
import classes from './editProperty.module.css'

const EditProperty = () => {
    const { id } = useParams()
    const { token } = useSelector((state) => state.auth)
    const [propertyDetails, setPropertyDetails] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [initialPhoto, setInitialPhoto] = useState(null)
    const [error, setError] = useState(false)
    const [emptyFields, setEmptyFields] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const data = await request(`/property/find/${id}`, 'GET')
                setPropertyDetails(data)
                setPhoto(data.img)
                setInitialPhoto(data.img)
            } catch (error) {
                console.error(error)
            }
        }
        fetchPropertyDetails()
    }, [id])

    const handleState = (e) => {
        setPropertyDetails(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        let filename = initialPhoto
        
        try {
            if (Object.values(propertyDetails).some((v) => v === '')) {
                setEmptyFields(true)
                setTimeout(() => {
                    setEmptyFields(false)
                }, 2500)
                return
            }


            const options = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            }

            await request(`/property/${id}`, 'PUT', options, { ...propertyDetails, img: filename })
            navigate(`/propertyDetail/${id}`)

        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500);
        }
    }



    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Update Property Title, Description and Price</h2>
                <form onSubmit={handleUpdate}>
                    <label>Title:</label>
                    <input value={propertyDetails?.title} type="text" placeholder='Title' name="title" onChange={handleState} />
                    
                    <label>Description:</label>
                    <input value={propertyDetails?.desc} type="text" placeholder='Desc' name="desc" onChange={handleState} />
                    
                    <label>Price:</label>
                    <input value={propertyDetails?.price} type="number" placeholder='Price' name="price" onChange={handleState} />
                   
                    <button type='submit'>Edit</button>
                </form>
                {error && (
                    <div className={classes.error}>
                        There was an error editing the listing! Try again.
                    </div>
                )}
                {emptyFields && (
                    <div className={classes.error}>
                        All fields must be filled!
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditProperty