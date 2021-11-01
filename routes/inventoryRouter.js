const express = require("express")
const inventoryRouter = express.Router()
const Inventory = require("../models/inventory.js")

//GET Request - ALL
inventoryRouter.get("/", (req, res, next) => {
    Inventory.find((err, inventories) => {
        if(err){
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
            if(err){
                res.status(500)
                return next (err)
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
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedInventory)
    })
})

//PUT Request - EDIT/UPDATE ONE


//DELETE Request - ONE

//DELETE Request - Delete all inventory tiems whose quantity equals "0"
inventoryRouter.delete("/deletezero", (req, res, next) => {
    Inventory.deleteMany(
        { quantity: 0 },
        (err, deletedZeroStock) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // return res.status(200).send(`Sucessfully deleted all items with zero quantity from the database`)
            return res.status(200).send(`You have deleted ${deletedZeroStock.deletedCount} zero stock items from the database`)
        })
})

//SEARCH BY TITLE Request



module.exports = inventoryRouter