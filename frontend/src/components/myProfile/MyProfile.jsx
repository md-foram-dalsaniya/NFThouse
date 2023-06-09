import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import person from '../../assets/person.jpg'
import classes from './myProfile.module.css'
import { logout } from '../../redux/authSlice'

const MyProfile = () => {
    const { user, token } = useSelector((state) => state.auth)
    const [listedProperties, setListedProperties] = useState([])
    
    const [activeBtn, setActiveBtn] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchListedProperties = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/property/find/my-properties`, 'GET', options)
                setListedProperties(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListedProperties()
    }, [])

   

    const handleDeleteProfile = async () => {
        try {
            const options = {
                Authorization: `Bearer ${token}`
            }
            await request(`/yacht/find/bookmarked-yachts`, 'GET', options)
            dispatch(logout())
            navigate('/signin')
        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500)
        }
    }


    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.profile}>
                    <div className={classes.updateDeleteControls}>
                        <Link className={classes.updateBtn} to={`/update-profile`}>Update Profile</Link>
                        {deleteModal && (
                            <div className={classes.deleteModal}>
                                <button onClick={handleDeleteProfile}>Yes</button>
                                <button onClick={() => setDeleteModal(prev => !prev)}>No</button>
                            </div>
                        )}
                        <button onClick={() => setDeleteModal(prev => !prev)} className={classes.deleteBtn}>Delete Profile</button>
                    </div>
                    <img alt='Profile' className={classes.userProfileImg} src={user?.profileImg ? `https://nfthouse-backend.onrender.com/images/${user?.profileImg}` : person} />
                    <div className={classes.userData}>
                        <h3>{user?.username}</h3>
                        <h4>{user?.email}</h4>
                    </div>
                </div>
               
                <div className={classes.catalog}>
                    {activeBtn === 0 && (
                        <>
                            {listedProperties?.length > 0 && <h2 className={classes.title}>Listed Properties</h2>}
                            <div className={classes.properties}>
                                {listedProperties?.length > 0 ? listedProperties?.map((listedProperty) => (
                                    <div key={listedProperty._id} className={classes.property}>
                                        <Link to={`/propertyDetail/${listedProperty._id}`} className={classes.imgContainer}>
                                            <img src={`https://nfthouse-backend.onrender.com/images/${listedProperty?.img}`} alt="" />
                                        </Link>
                                        <div className={classes.details}>
                                            <div className={classes.priceAndOwner}>
                                                <span className={classes.price}>$ {listedProperty.price}</span>
                                                <img alt='Profile' src={user?.profileImg ? `https://nfthouse-backend.onrender.com/images/${user?.profileImg}` : person} className={classes.owner} />
                                            </div>
                                            <div className={classes.moreDetails}>
                                                <span>{listedProperty?.beds} <FaBed className={classes.icon} /></span>
                                                <span>{listedProperty?.sqmeters} sq. meters<FaSquareFull className={classes.icon} /></span>
                                            </div>
                                            <div className={classes.desc}>
                                                {listedProperty?.decs}
                                            </div>
                                        </div>
                                    </div>
                                )) : <h2 className={classes.noListed}>You have no listed properties</h2>}
                            </div>
                        </>
                    )}
                    
                </div>
                {error && (
                    <div className={classes.error}>
                        There was an error!
                    </div>
                )}
            </div>
        </div>
    )
}


export default MyProfile