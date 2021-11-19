// import React from "react"
import React, { useState, useEffect } from "react"
import axios from "axios"



function SnapShot() {

    const [totalListings, setTotalListings] = useState(0)
   
    const [totalValue, setTotalValue] = useState(0)
    
    const [categValue, setCategValue] = useState([])

    const getTotalItems= () => {
        axios.get(`inventories/total/items`)
            .then(res => setTotalListings(res.data[0].totalItems))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log("useEffect triggered")
        getTotalItems()
    }, [])

  

    const getTotalValue = () => {
        axios.get(`inventories/total/value`)
            .then(res => setTotalValue(res.data[0].totalprice))       
            .catch(err => console.log(err))
    }


    useEffect(() => {
        console.log("useEffect triggered")
        getTotalValue()
    }, [])

    
    
    //Currency Format for SnapShot.js
    //from:  https://newbedev.com/how-do-you-format-a-number-to-currency-when-using-react-native-expo
    //other link:  https://blog.abelotech.com/posts/number-currency-formatting-javascript/
   const currencyFormat = (num)=> {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')  
    }


    //Need to figure out how to filter out zero quantities from this total value--write it into the route?
    const getCategValue = () => {
        axios.get(`inventories/total/valueByCategory`)
            .then(
                res => setCategValue (res.data))
            
            .catch(err => console.log(err))
          
    }

    useEffect(() => {
        console.log("useEffect triggered")
        getCategValue()
    }, [])




    return (

        <div>

            <h3>Number of Listings: {totalListings} </h3>
            <h3>Listings Value: $ {currencyFormat(totalValue)}</h3>

            <h3>Value By Category:</h3>
            {categValue.map((category, index)=>{
                return(
                    <div>
                        <h4>{category._id}:  $ {currencyFormat(category.totalprice)}</h4>
                    </div>
               
                )

            })
        }


        </div>
    );
}

export default SnapShot;