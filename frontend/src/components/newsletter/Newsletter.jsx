import React, { useRef } from 'react'
import classes from './newsletter.module.css'
import { FiSend } from 'react-icons/fi'
import emailjs from '@emailjs/browser'


const Newsletter = () => {
  const formRef = useRef()


  const subscribehandler = async (e) => {
    e.preventDefault()

    emailjs.sendForm("service_uvsxejk", "template_rmxclld", formRef.current, '86zTC20q3Ntb3Uobf')
      .then((result) => {
        alert("You have successfully subscribed.")
      }, (error) => {
        console.log(error.text);
      });
  }
  

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Want to get the latest offers?</h5>
          <h2>Send us your email and we will do the rest!</h2>
        </div>
        <form ref={formRef}>
        <div className={classes.inputContainer} >
          <input type="email" placeholder='Type email...' style={{border: '2px solid #333', borderRadius:'20px', height: '50px', width: '360px',padding: '0.25rem 0.5rem',justifyContent: 'space-between', alignItems: 'center'}} name='to_email'  />
          <FiSend className={classes.sendIcon} style={{cursor:'pointer', height:'30px', width: '30px', marginLeft:'10px', marginTop:'15px', paddingTop:'5px'}} onClick={subscribehandler} />
        </div>
          </form>
      </div>
    </div>
  )
}

export default Newsletter