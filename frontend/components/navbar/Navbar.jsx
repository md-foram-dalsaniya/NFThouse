import React, { useContext, useState } from 'react'
import classes from './navbar.module.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { BsHouseDoor } from 'react-icons/bs'
import { logout } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'
import { useEffect } from 'react'
import Loader from '../Loader/Loader'
import { WalletContext } from '../../context/wallet'
import WalletConnect from '../WalletConnect/WalletConnect'



const Navbar = () => {
  const context = useContext(WalletContext);
  const { walletAddress, nftContract, getCurrentWalletConnected, addWalletListener, signer, loader, setLoader } = context;
  const [state, setState] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { user, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setLoader(false)
    setState(prev => {
      return { ...prev, type: 'beach' }
    })
  }, [])

  useEffect(() => {

    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  // mobile
  const [showMobileNav, setShowMobileNav] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/signin")
  }


  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setPhoto(null)
    setState({})
  }

  const handleListProperty = async (e) => {

    setLoader(true);

    e.preventDefault()
    let filename = null
    let result_location = null
    let lat
    let lng
    try {
      if (photo) {
        const abc = await document.getElementById('photo').value
        console.log(abc);
        console.log("PHOTO NAME IS ====");
        console.log(photo);

        const formData = new FormData()
        filename = await crypto.randomUUID() + photo.name
        console.log(filename);

        formData.append('filename', filename)
        formData.append('image', photo)
        console.log(photo);
        console.log("OOOOOOOOOOOOOOOOO");
        console.log("+++++++++");

        const options = {
          "Authorization": `Bearer ${token}`,
        }

        await request("/upload/image", 'POST', options, formData, true)
      } else {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 2500)
        return
      }


      try {
        if (Object.values(state).some((v) => !v) && Object.values(state).length < 7) {
          setError(true)
          setTimeout(() => {
            setError(false)
          }, 2500)
          return
        }

        const options = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'application/json'
        }


        const url = `https://google-maps-geocoding3.p.rapidapi.com/geocode?address=${state.Address}`;
        const options2 = {
          method: 'GET',

          headers: {
            'X-RapidAPI-Key': '6d02ceddcamsh896b49b7bf33718p1e17b8jsnfe5af48aab68',
            'X-RapidAPI-Host': 'google-maps-geocoding3.p.rapidapi.com'
          }
        };

        try {
          const response_coord = await fetch(url, options2);
          const result_coord = await response_coord.json();
          lat = await result_coord.latitude;
          lng = await result_coord.longitude


        } catch (error) {
          console.error(error);
        }



        result_location = await `https://maps.google.com/?q=${lat},${lng}`

        const response1 = await fetch(`http://localhost:5000/property/upload`, {
          method: 'POST',
          headers: options,
          body: JSON.stringify({ ...state, img: filename, location: result_location })
        });

        const num = await nftContract.NumberOfProperty();
        const num2 = await num.toNumber();
        const Pid = await num2 + 1;
        const data = await request(`/property/getall/${Pid}`, 'GET')
        console.log(data);
        const data0 = data[0]
        const Metadata = await data0.metadata;
        console.log(Metadata);
        const hid = await data0._id;
        console.log(hid);
        const nftContractWithSigner = await nftContract.connect(signer);
        console.log(nftContractWithSigner);
        const response = await nftContractWithSigner.Sale(Metadata)
        console.log(response);
        const abc = await response.wait();
        console.log(abc);
        if (abc.status === 1) {
          alert("Property Listed Successfully.")
        }

        setShowModal(false)
        setShowForm(false)
        setLoader(false)
        navigate(`/propertyDetail/${hid}`);
      } catch (error) {
        console.log("There is error");
        console.log(error);
        setError(true)
        setTimeout(() => {
          setLoader(false)
          setError(false)
        }, 2500)
      }

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <Link to='/' onClick={scrollToTop} className={classes.left}>
          NFThouse <BsHouseDoor />
        </Link>
        <ul className={classes.center}>
          <Link to='/' onClick={scrollToTop} className={classes.listItem}>
            Home
          </Link>

          <Link to='/about' className={classes.listItem}>
            About
          </Link>

          <Link to='/contact' className={classes.listItem}>
            Contacts
          </Link>
        </ul>
        <div className={classes.right}>
          {!user ?
            <>
              <Link to='/signup'>Sign up</Link>
              <Link to='/signin'>Sign in</Link>
            </>
            :
            <>
              <span className={classes.username} onClick={() => setShowModal(prev => !prev)}>Hello {user.username}!</span>
              {showModal && (
                <div className={classes.userModal}>
                  <AiOutlineClose onClick={() => setShowModal(prev => !prev)} className={classes.userModalClose} />
                  <span className={classes.logoutBtn} onClick={handleLogout}>Logout</span>
                  <Link to={`/my-profile`} onClick={() => setShowModal(prev => !prev)} className={classes.myProfile}>My Profile</Link>
                  <Link onClick={() => setShowForm(true)} className={classes.list}>List your property</Link>
                 
                </div>
              )}
            </>
          }&emsp;
          <div className="d-flex">
          

            <WalletConnect />
          </div>
        </div>
      </div>

      {
        // desktop screen
        !showMobileNav && showForm &&
        <div className={classes.listPropertyForm} onClick={handleCloseForm}>
          <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
            <h2>List Property</h2>

            <form onSubmit={handleListProperty}>
              <input value={state?.title} type="text" placeholder='Title' name="title" onChange={handleState} />
              <select
                value={state?.type}
                required
                name="type"
                onChange={handleState}
              >

                <option value="beach">Beach</option>
                <option value="village">Village</option>
                <option value="mountain">Mountain</option>
                <option value="city">City</option>
              </select>
              <input
                value={state?.desc}
                type="text"
                placeholder="Desc"
                name="desc"
                onChange={handleState}
              />

              <input
                value={state?.address}
                type="text"
                placeholder="Address with Pincode"
                name="Address"
                onChange={handleState}
              />

              <input
                value={state?.city}
                type="text"
                placeholder="City"
                name="City"
                onChange={handleState}
              />
             
              <input value={state?.price} type="number" placeholder='Price' name="price" onChange={handleState} />

              <input value={state?.sqmeters} type="number" placeholder='Sq. meters' name="sqmeters" onChange={handleState} />

              <input value={state?.rooms} type="number" placeholder='Rooms' name="Rooms" step={1} min={1} onChange={handleState} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                <label htmlFor='photo'>Property picture <AiOutlineFileImage /></label>
                <input
                  type="file"
                  id='photo'
                  style={{ display: 'none' }}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {photo && <p>{photo.name}</p>}
              </div>
              {loader ? <Loader /> :
                <button>List property</button>}
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
          </div>
        </div>
      }
      {
        // mobile screen 
        <div className={classes.mobileNav}>
          {showMobileNav &&
            <div className={classes.navigation}>
              <Link to='/' onClick={scrollToTop} className={classes.left}>
                Real Estate <BsHouseDoor />
              </Link>
              <AiOutlineClose className={classes.mobileCloseIcon} onClick={() => setShowMobileNav(false)} />
              <ul className={classes.center}>
                <li onClick={scrollToTop} className={classes.listItem}>
                  Home
                </li>
                <li className={classes.listItem}>
                  About
                </li>
                
                <li className={classes.listItem}>
                  Contacts
                </li>
              </ul>
              <div className={classes.right}>
                {!user ?
                  <>
                    <Link to='/signup'>Sign up</Link>
                    <Link to='/signin'>Sign in</Link>
                  </>
                  :
                  <>
                    <span>Hello {user.username}!</span>
                    <span className={classes.logoutBtn} onClick={handleLogout}>Logout</span>
                    <Link onClick={() => setShowForm(true)} className={classes.list}>List your property</Link>
                  </>
                }
              </div>
              {showForm &&
                <div className={classes.listPropertyForm} onClick={handleCloseForm}>
                  <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
                    <h2>List Property</h2>
                    <form onSubmit={handleListProperty}>
                      <input value={state?.title} type="text" placeholder='Title' name="title" onChange={handleState} />
                      <input value={state?.type} type="text" placeholder='Type' name="type" onChange={handleState} />
                      <input value={state?.desc} type="text" placeholder='Desc' name="desc" onChange={handleState} />
                      <input value={state?.city} type="text" placeholder='City' name="city" onChange={handleState} />
                      <input value={state?.price} type="number" placeholder='Price' name="price" onChange={handleState} />
                      <input value={state?.sqmeters} type="number" placeholder='Sq. meters' name="sqmeters" onChange={handleState} />
                      <input value={state?.beds} type="number" placeholder='Beds' name="beds" step={1} min={1} onChange={handleState} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                        <label htmlFor='photo'>Property picture <AiOutlineFileImage /></label>
                        <input
                          type="file"
                          id='photo'
                          style={{ display: 'none' }}
                          onChange={(e) => setPhoto(e.target.files[0])}
                        />
                        {photo && <p>{photo.name}</p>}
                      </div>
                      <button>List property</button>
                    </form>
                    <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
                  </div>
                </div>}
            </div>}
          {!showMobileNav && <GiHamburgerMenu onClick={() => setShowMobileNav(prev => !prev)} className={classes.hamburgerIcon} />}
        </div>
      }


      {/* error */}
      {error && (
        <div className={classes.error}>
          <span>All fields must be filled!</span>
        </div>
      )}
    </div>
  )
}

export default Navbar