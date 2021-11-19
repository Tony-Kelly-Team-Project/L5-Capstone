// import React from "react"
import React, { useState, useEffect } from "react"
import axios from "axios"
import "./SnapShot.css"



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

        <div className="snapshot-table">
      
        <div className="summary-table">
                <tr classname="tot-list">
            
                        <th>Total Number of Listings:</th>
                        <td className="tot-listings-num">  {totalListings} </td>
                </tr>
                <tr className="tot-value">
                        <th >Total Listings Value: </th>
                        <td className="tot-value-num">{currencyFormat(totalValue)}</td>
 
                </tr>


            <h5 className="val-categ-title">Value By Category:</h5>
            {categValue.map((category, index)=>{
                return(
                    
                    <div>
                        <tr>
                        <th>{category._id}: </th>  
                        <td className="category-values"> {currencyFormat(category.totalprice)}</td>
                        </tr>
                    </div>
               
                )

            })
        }

</div>
        </div>
    );
}

export default SnapShot;