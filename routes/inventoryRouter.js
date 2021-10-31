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


//SEARCH BY TITLE Request

module.exports = inventoryRouter