import React, { useContext } from 'react'
import classes from './propertyDetail.module.css'
import person from '../../assets/person.jpg'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { request } from '../../util/fetchAPI'
import { FaBed, FaSquareFull } from 'react-icons/fa'

import Comment from '../comment/Comment'
import BuyProperty from '../BuyProperty/BuyProperty'
import SOLD from '../../assets/Sold.jpg'
import { WalletContext } from '../../context/wallet'
import Deloader from '../Deloader/Deloader'
import eth from '../../assets/eth.jpg'

const PropertyDetail = () => {
  const { token, user } = useSelector((state) => state.auth)
  const context = useContext(WalletContext);
  const { nftContract, signer } = context;
  const [propertyDetail, setPropertyDetail] = useState(null)
  
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const [delLoader, setDelLoader] = useState(false)
  // todo display message
  const [shortComment, setShortComment] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request(`/property/find/${id}`, "GET")
        setPropertyDetail(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDetails()
  }, [id])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await request(`/comment/${id}`, 'GET')
        setComments(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchComments()
  }, [id])

  



  const handleDelete = async () => {
    try {
      setDelLoader(true);
      const num = await nftContract.NumberOfProperty();
      console.log(num);
      const nftContractWithSigner = await nftContract.connect(signer);
      console.log(nftContractWithSigner);
      const response = await nftContractWithSigner.cancelSale(propertyDetail.propertyid)
      console.log(response);
      const abc = await response.wait();
      console.log(abc);
      if (abc.status === 1) {
        await request(`/property/${id}`, 'DELETE', { 'Authorization': `Bearer ${token}` })
        alert("Property Deleted Successfully.")
      }
      setDelLoader(false);
      navigate('/')
    } catch (error) {
      setDelLoader(false)
      console.log(error)
      alert(error.reason)
    }
  }

  

  const handleComment = async () => {

    if (commentText?.length < 2) {
      setShortComment(true)
      setTimeout(() => {
        setShortComment(false)
      }, 2500)
      return
    }

    try {
      const options = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }

      const newComment = await request(`/comment`, 'POST', options, { text: commentText, listing: id })
      setComments((prev) => {
        return [newComment, ...prev]
      })

      setCommentText('')
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className={classes.container}>
      <h3 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '32px', marginTop: '-2.5rem' }}>Property Details</h3>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img alt='Property' src={`http://localhost:5000/images/${propertyDetail?.img}`} />
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {`${propertyDetail?.title}`}
            {user?._id === propertyDetail?.currentOwner?._id && (
              <div className={classes.controls}>
                <Link to={`/editProperty/${id}`}>Edit</Link>
                {delLoader ? <Deloader/> :
                <button onClick={handleDelete}>Delete</button>}
              </div>)
            }
          </h3>
          <div className={classes.details}>
            <div className={classes.typeAndContinent}>
              <div>Type: <span>{`${propertyDetail?.type}`}</span></div>
              <div>City: <span>{`${propertyDetail?.city}`}</span></div>
            </div>
            <div className={classes.priceAndOwner}>
              <span className={classes.price}><span>Price: <img alt='Currency Symbol' src={eth} width='17px' height='20px' /> </span>{`${propertyDetail?.price}`}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                Owner: {propertyDetail?.currentOwner?.profileImg
                  ? (
                    <img alt='Owner Profile ' src={`http://localhost:5000/images/${propertyDetail?.currentOwner?.profileImg}`} className={classes.owner} />
                  ) : (
                    <img alt='Default Profile ' src={person} className={classes.owner} />)
                }</span>
            </div>
            <div className={classes.moreDetails}>
              <span>{propertyDetail?.beds} <FaBed className={classes.icon} /></span>
              <span>{propertyDetail?.sqmeters} square meters <FaSquareFull className={classes.icon} /></span>
            </div>
          </div>
          <p className={classes.desc}>
            Desc: <span>{`${propertyDetail?.desc}`}</span>
          </p>
          <p className={classes.desc}>
            Address: <span>{`${propertyDetail?.address}`}</span>
          </p>
         

          <Link to={propertyDetail?.location} target='blank'><button className={classes.location}>Location</button></Link><br />

          {user && (user?._id !== propertyDetail?.currentOwner?._id.toString() ?  
          (propertyDetail?.ForSale ? <BuyProperty propertyDetail={propertyDetail} />
            :
            <img width='200px' height='150px' src={SOLD} alt='SOLD' />
          ) 
          : "" )}

          
          {user?._id == null && (
            <Link to={`/signin`}>
              <h4 className={classes.noFuncMessage}>
                Sign in to get access to the functionality.
              </h4>
            </Link>
          )
          }
        </div>
      </div>
    
      
      {shortComment && (
        <div>
          <div className={classes.error}>
            Comment must be at least 2 characters long!
          </div>
        </div>
      )}
      <div className={classes.commentSection}>
        {/* comment input */}
        {user?._id == null && <h3 style={{ margin: '0.75rem', fontSize: '24px' }}>Sign in to be able to comment!</h3>}
        {user?._id != null && <div className={classes.commentInput}>
          <img alt='Profile' src={`http://localhost:5000/images/${user?.profileImg}`} />
          <input value={commentText} type="text" placeholder='Type message...' onChange={(e) => setCommentText(e.target.value)} />
          <button onClick={handleComment}>Post</button>
        </div>}
        {/* displaying comments */}
        <div className={classes.comments}>
          {
            comments?.length > 0
              ? (
                comments?.map((comment) => (
                  <Comment setComments={setComments} key={comment._id} comment={comment} />
                ))
              )
              : (
                <h2 className={classes.noCommentsMessage}>
                  No comments yet.
                </h2>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail