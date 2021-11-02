const express = require("express")
const inventoryRouter = express.Router()
const Inventory = require("../models/inventory.js")

//GET Request - ALL
inventoryRouter.get("/", (req, res, next) => {
    Inventory.find((err, inventories) => {
        if (err) {
            response.status(500)
            return next(err)
        }
        return res.status(200).send(inventories)
    })
})

//GET Request - ONE
inventoryRouter.get("/:inventoryID", (req, res, next) => {
    Inventory.find(
        { _id: req.params.inventoryID },
        (err, updatedItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedItem)
        })
})

//GET Request - Find iventory items that equal "0"
inventoryRouter.get("/search/zeroquantity", (req, res, next) => {
    Inventory.where("quantity").lte(0).exec((err, zeroStock) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(zeroStock)
    })
})


//POST Request - ADD ONE
inventoryRouter.post("/", (req, res, next) => {
    console.log(req.params)
    req.body.inventory = req.params.inventoryID
    const newInventory = new Inventory(req.body)
    newInventory.save((err, savedInventory) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedInventory)
    })
})


//PUT Request - EDIT/UPDATE ONE
inventoryRouter.put("/:inventoryID", (req, res, next) => {
    Inventory.findOneAndUpdate(
        { _id: req.params.inventoryID },
        req.body,
        { new: true },
        (err, updatedInventory) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedInventory)
        }
    )
})


// DELETE Request - ONE
inventoryRouter.delete("/:inventoryID", (req, res, next) => {
    Inventory.findOneAndDelete(
        { _id: req.params.inventoryID },
        (err, deletedInventory) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted inventory item ${deletedInventory.title} with SKU ${deletedInventory.SKU}`)
        })
})


//GET INVENTORY BY SEARCH TITLE TERM (use mongoDB method $regex)
// "i" means case insensitive
inventoryRouter.get("/search", (req, res, next) => {
    const { title } = req.query
    const pattern = new RegExp(title)
    Inventory.find({ title: { $regex: pattern, $options: "i" } },
        (err, titles) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(titles)
        })
})

//FILTER BY CATEGORY
//$filter
//$and
//$or
//NOTE:  When have both above & below code:  it's returning ALL items, instead of filtered
//NOTE:  HOWEVER, if I comment out the code above, then the below code works; does it need to be combined with above???  HOW COMBINE??

inventoryRouter.get("/search", (req, res, next) => {
    const { category } = req.query
    const pattern = new RegExp(category)
    Inventory.find({ category: { $regex: pattern, $options: "i" } },
        (err, categories) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(categories)
        })
})

//possibly add filter that you can give range of inventory quantities (min/max) & also sort high/low low/high -- youtube vid???


//SORT BY CATEGORY
//.find().sort()
//$match(), $group(), $sort()
//QUESTION:  where is best place for SORTING?  --Here in router/mongoDB, or better in React??

//DO NOT think this code is correct below -- how write it & how test?
// inventoryRouter.get("/", (req, res, next) => {
//     Inventory.find().sort(
//         { category: 1 }
//     ),
//         (err, categories) => {
//             if (err) {
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(200).send(categories)
//         }
// })



//DELETE Request - Delete all inventory tiems whose quantity equals "0"
inventoryRouter.delete("/delete/zero", (req, res, next) => {
    Inventory.deleteMany(
        { quantity: 0 },
        (err, deletedZeroStock) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // return res.status(200).send(deletedZeroStock)
            return res.status(200).send(`You have deleted ${deletedZeroStock.deletedCount} zero stock items from the database`)
        })
})



module.exports = inventoryRouter