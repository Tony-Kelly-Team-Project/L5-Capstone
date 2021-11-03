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

//GET Request - Find inventory items that equal "0"
inventoryRouter.get("/search/zeroquantity", (req, res, next) => {
    Inventory.where("quantity").lte(0).exec((err, zeroStock) => {
        if (err) {
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


//DELETE Request - ONE
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
//ALSO == look at createIndex + $text =>  supposedly faster processing speed (vs. using $regex) when using indexing
// "i" means case insensitive
inventoryRouter.get("/search/title", (req, res, next) => {
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


//FILTER/SEARCH BY CATEGORY
//ALSO == look at createIndex + $text =>  supposedly faster processing speed (vs. using $regex) when using indexing
//$filter
//$and
//$or
//$elemMatch
//.aggregate() + $match  [aggregate -- also maybe helpful for reports/summaries]

inventoryRouter.get("/search/category", (req, res, next) => {
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


//ATTEMPT AT COMBINING SEARCH BY TITLE, SEARCH BY CATEGORY -- but not working right now
// inventoryRouter.get("/search", (req, res, next) => {
//     const { userTyped } = req.query
//     const pattern = new RegExp(userTyped)
//     Inventory.find({
//         $or: [
//             { category: { $regex: pattern, $options: "i" } },
//             { title: { $regex: pattern, $options: "i" } }
//         ]
//     },
//         (err, categories) => {
//             if (err) {
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(200).send(categories)
//         })
// })

//SORT BY CATEGORY -- using find & sort -- but doesn't seem to work??
// inventoryRouter.get("/list/sorted", (req, res, next) => {
//     Inventory.find().sort({ "category": 1, "_id": 1 }),
//         (err, sortedItems) => {
//             if (err) {
//                 res.status(500)
//                 return next(err)
//             }
//             // return res.status(200).send(`Sucessfully deleted all items with zero quantity from the database`)
//             return res.status(200).send(sortedItems)
//         }
// })


//SORT ALL INVENTORY BY CATEGORY & ID ASCENDING ORDER ON BOTH -- USING AGGREGATION
inventoryRouter.get("/list/sorted", (req, res, next) => {
    Inventory.aggregate([
        { $sort: { category: 1, _id: 1 } }
    ],

        (err, sortedInventory) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(sortedInventory)
        }

    )
})


//DELETE Request - Delete all inventory items whose quantity equals "0"
inventoryRouter.delete("/deletezero", (req, res, next) => {
    Inventory.deleteMany(
        { quantity: 0 },
        (err, deletedZeroStock) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            // return res.status(200).send(`Sucessfully deleted all items with zero quantity from the database`)
            return res.status(200).send(`You have deleted ${deletedZeroStock.deletedCount} zero stock items from the database`)
        })
})



//RETURNS AGGREGATED TOTAL VALUE BY CATEGORY:
inventoryRouter.get("/total/valueByCategory", (req, res, next) => {
    Inventory.aggregate([
        { $match: {} },
        { $group: { _id: "$category", totalprice: { $sum: "$price" } } }
    ],
        (err, priceTotal) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(priceTotal)
        }
    )
})



module.exports = inventoryRouter