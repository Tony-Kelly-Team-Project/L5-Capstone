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


    const getCategValue = () => {
        axios.get(`inventories/total/valueByCategory`)
            .then(res => setCategValue (res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log("useEffect triggered")
        getCategValue()
    }, [])

  

    return (

        <div>

            <h1>Look, I'm the SnapShot Summary!</h1>

            <h3>Number of Listings: {totalListings} </h3>
            <h3>Listings Value: $ {totalValue}</h3>

            <h3>Value By Category:</h3>
            {categValue.map((category, index)=>{
                return(
                    <div>
                        <h4>{category._id}:  $ {category.totalprice}</h4>
                    </div>
               
                )

            })
        }


        </div>
    );
}

export default SnapShot;