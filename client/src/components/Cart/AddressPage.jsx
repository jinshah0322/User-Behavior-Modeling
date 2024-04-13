import React,{useState,useEffect} from 'react';
import axios from 'axios';
const AddressPage = ({setCurrent,setIsPayment}) => {
    const [user,setUser] = useState()
    const fetchData = async () => {

        try {
            const id = localStorage.getItem("id");
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/user/profile/${id}`);
            setUser({
                streetAddress: response.data.user.streetAddress,
                city: response.data.user.city,
                state: response.data.user.state,
                country: response.data.user.country,
                postalcode: response.data.user.postalcode,
            });          

        } catch (error) {
            console.log(error);
        }
    };
    const handleNextPage = () => {
        setCurrent(2);
        setIsPayment(true);
    }
    useEffect(() => {
        fetchData();
    }, []);
  return (
    <div>
        <h1>Your Current address is </h1>
        <p>
            {user?.streetAddress}, {user?.city}, {user?.state}, {user?.country} - {user?.postalcode} 
        </p>
        <p>
            If you want to change the address, please go to your profile and update the address
        </p>
        <button onClick={handleNextPage}>Proceed to Payment</button>
    </div>
  );
}

export default AddressPage;