import React, { useContext } from 'react'
import classes from './Buy.module.css'
import { WalletContext } from '../../context/wallet';
import { request } from '../../util/fetchAPI';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Deloader from '../Deloader/Deloader';



const BuyProperty = (props) => {
    const context = useContext(WalletContext);
    const { nftContract, signer, loader, setLoader } = context;
    const { token } = useSelector((state) => state.auth)
    const { propertyDetail } = props

    const navigate = useNavigate()
    // setLoader(true);



    const buyHome = async () => {
        setLoader(true);
        console.log(propertyDetail.propertyid);


        try {

            
            console.log(signer);
            console.log(nftContract);
            console.log("===============");
            console.log(propertyDetail.price);
            // const nonc = await signer.getTransactionCount();
            const num = await nftContract.NumberOfProperty();
            console.log(num);
            const nftContractWithSigner = await nftContract.connect(signer);
            console.log(nftContractWithSigner);
            const response = await nftContractWithSigner.Buy(propertyDetail.propertyid, { value: propertyDetail.price })
            console.log(response);
            const abc = await response.wait();
            const options = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
            await request(`/property/buy/${propertyDetail._id}`, 'PUT', options, { ForSale: false })
            console.log(abc);
            if (abc.status === 1) {
                alert("Property Bought Successfully.")
            }
            setLoader(false)
            navigate('/');

        } catch (error) {
            setLoader(false)
            alert(error.reason);
            console.log(error);
        }

    }
    return (
        <div className=''>
            {loader ? <Deloader /> :
                <button className={classes.buy} onClick={buyHome}> Buy_Now </button>
                }
                {/* <i className="fa-solid fa-cart-shopping fa-beat-fade" onClick={buyHome}> Buy_Now </i> */}
        </div>
    )
}

export default BuyProperty
