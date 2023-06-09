const verifyToken = require('../middlewares/verifyToken')
const express = require('express')
const router = express.Router();
const property = require('../models/propertyModelSchema')

const propertyController = require('../controller/propertyController')

// create Property OR List Property
router.post('/upload', verifyToken, propertyController.uploadDocuments )

router.post('/filechange', propertyController.changeFile )

router.get('/show', propertyController.getDocuments )
router.get('/show/:id', propertyController.getDocumentsById )

// get all
router.get('/getAll', async (req, res) => {
    try {
        console.log("/getAll");
        const properties = await property.find({}).populate("currentOwner", '-password')

        console.log(properties)

        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})

router.get('/getAll/:id', async (req, res) => {
    try {
        console.log("/getAll");
        const properties = await property.find({propertyid: req.params.id}).populate("currentOwner", '-password')

        console.log(properties)

        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})



// get all from type
router.get('/find', async (req, res) => {
    const type = req.query
    let properties = []
    try {
        console.log("/find");
        if (type) {
            properties = await property.find(type).populate("currentOwner", '-password')
        } else {
            properties = await property.find({})
        }

        return res.status(200).json(properties)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// TODO FETCH TYPE OF PROPERTIES. EX: {BEACH: 34, MOUNTAIN: 23}
router.get('/find/types', async (req, res) => {
    try {
        console.log("/find/types");
        // console.log(req.params.id);
        console.log("===================");
        const beachType = await property.countDocuments({ type: 'beach' })
        const mountainType = await property.countDocuments({ type: 'mountain' })
        const villageType = await property.countDocuments({ type: 'village' })
        const cityType = await property.countDocuments({ type: 'city' })

        return res.status(200).json({ beach: beachType, mountain: mountainType, village: villageType, city: cityType })
    } catch (error) {
        return res.status(500).json(error)
    }
})

// fetch my properties
router.get('/find/my-properties', verifyToken, async (req, res) => {
    try {
        console.log("/find/my-properties");
        console.log(req.user.id);
        console.log("===================");
        const properties = await property.find({ currentOwner: req.user.id })

        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})


// TODO FETCH INDIVIDUAL PROPERTY
router.get('/find/:id', async (req, res) => {
    try {
        console.log("/find/:id");
        console.log(req.params.id);
        console.log("===================");
        const properti = await property.findById(req.params.id).populate('currentOwner', '-password')

        if (!properti) {
            throw new Error('No such property with that id')
        } else {
            // console.log(properti.json);
            return res.status(200).json(properti)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})



// update estate
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const properti = await property.findById(req.params.id)
        if (properti.currentOwner.toString() !== req.user.id) {
            throw new Error("You are not allowed to update other people's properties")
        }

        const updatedProperty = await property.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )


        return res.status(200).json(updatedProperty)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})

router.put('/buy/:id', verifyToken, async (req, res) => {
    try {
        // const properti = await property.findById(req.params.id)

        const updatedProperty = await property.findByIdAndUpdate(
            req.params.id,
            { $set: {ForSale : req.body.ForSale, currentOwner: req.user.id} },
            { new: true }
        )


        return res.status(200).json(updatedProperty)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})

// bookmark/unbookmark estate
router.put('/bookmark/:id', verifyToken, async (req, res) => {
    try {
        let property = await property.findById(req.params.id)
        if (property.currentOwner.toString() === req.user.id) {
            throw new Error("You are not allowed to bookmark your project")
        }


        if (property.bookmarkedUsers.includes(req.user.id)) {
            property.bookmarkedUsers = property.bookmarkedUsers.filter(id => id !== req.user.id)
            await property.save()
        } else {
            property.bookmarkedUsers.push(req.user.id)

            await property.save()
        }

        return res.status(200).json(property)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// delete estate
router.delete('/:id', verifyToken, async (req, res) => {
    console.log("Delete");
    try {
        const properties = await property.findById(req.params.id)
        if (properties.currentOwner.toString() !== req.user.id) {
            throw new Error("You are not allowed to delete other people properties")
        }

        console.log("Deleted");
        console.log(properties);
        await properties.deleteOne()

        return res.status(200).json({ msg: "Successfully deleted property" })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})

module.exports = router;