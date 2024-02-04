const port = 4000;
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { GridFsStorage } = require("multer-gridfs-storage")
const path = require('path');
const cors = require('cors');
const { GridFSBucket, ObjectId, MongoClient } = require('mongodb');

app.use(express.json());
app.use(cors());


const BASE_URL = process.env.PROTOCOL + process.env.HOST_URL;
const url = process.env.MONGODB_URI;

// Database Connection With MongoDB
mongoose.connect(process.env.MONGODB_URI);
console.log("Server Running On :", BASE_URL);

const mongoClient = new MongoClient(url)
mongoClient.connect()

const database = mongoClient.db("e-commerce")

const imageBucket = new GridFSBucket(database, {
    bucketName: "photos",
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// API Creation

app.get('/', (req, res) => {
    res.send('Express is running');
})

// Image Storage Engine

const storage = new GridFsStorage({
    url,
    file: (req, file) => {
        //If it is an image, save to photos bucket
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            return {
                bucketName: "photos",
                filename: `${Date.now()}${file.originalname}`,
            }
        } else {
            //Otherwise save to default bucket
            return `${Date.now()}${file.originalname}`
        }
    },
})

const upload = multer({ storage: storage })

// Createing Upload Endpoint for images
app.post('/upload/image', upload.single('product'), (req, res) => {
    const file = req.file;

    res.json({
        success: 1,
        message: "Uploaded",
        id: file.id,
        name: file.filename,
        contentType: file.contentType,
        image_url: `${process.env.PROTOCOL}${process.env.HOST_URL}/view/${file.filename}`
    })
})

app.get("/view/:filename", async (req, res) => {
    try {
        imageBucket.openDownloadStreamByName(
            req.params.filename
        ).pipe(res)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error Something went wrong",
            error,
        })
    }
})

// Schema for Creating Products
const Product = mongoose.model('Product', {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    image_id: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        image_id: req.body.image_id,
        category: req.body.category,
        type: req.body.type,
        brand: req.body.brand,
        description: req.body.description,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log('Saved');
    res.json({
        success: true,
        name: req.body.name,
    })
});

// Creating API for deleting product image
app.post('/remove/image/', async (req, res) => {
    try {
        await imageBucket.delete(new ObjectId(req.body.image_id))

        res.status(200).send({
            message: "Image Deleted",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error Something went wrong",
            error,
        })
    }
})

// Creating API for deleting products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    await imageBucket.delete(new ObjectId(req.body.image_id))
    console.log(`Product id:${req.body.id}  Removed`);
    res.json({ success: true, name: req.body.id })
});

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched")
    res.json(products);
})

//Schema Creating for User Model
const Users = mongoose.model('Users', {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    cartData: { type: Object },
    purchaseHistory: { type: Object },
    date: { type: Date, default: Date.now },
})

//Creating Endpoint for registering users
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, message: "Email Already Exists" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "user",
        cartData: cart,
        purchaseHistory: [],
    });
    await user.save();
    const data = {
        user: {
            id: user.id,
        }
    }
    const token = jwt.sign(data, 'secret_ecom')
    res.json({ success: true, token })
})

//Creating Endpoint for login users
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Password" })
        }
    } else {
        res.json({ success: false, message: "Invalid Email" })
    }
});

// Creating endpoint for newcollection data
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched")
    res.send(newcollection);
});

// Creating endpoint for popular in women section
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched")
    res.send(popular_in_women);
})

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: 'Please authenticate using valid token' })
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: 'Please authenticate using valid token' })
        }
    }
}

// Creating endpoint for adding products to cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send({ msg: "Product Added" })
})

// Creating endpoint for adding products to purchasehistory
app.post('/addtopurchasehistory', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.purchaseHistory.push(req.body.item);
    await Users.findOneAndUpdate({ _id: req.user.id }, { purchaseHistory: userData.purchaseHistory });
    res.send({ msg: "Product History Added" })
})

// Creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send({ msg: "Product Removed" })
})

// Creating endpoint to remove all products from cartdata
app.post('/removeAllFromCart', fetchUser, async (req, res) => {
    console.log("added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    userData.cartData = cart;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send({ msg: "Cart Cleared" })
})

// Creating endpoint to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
    console.log('GetCart')
    let userData = await Users.findOne({ _id: req.user.id });
    res.send(userData.cartData);
})

// Creating endpoint to get purchasehistory
app.post('/getorders', fetchUser, async (req, res) => {
    console.log('GetOrders')
    let userData = await Users.findOne({ _id: req.user.id });
    res.send(userData.purchaseHistory);
})

// Creating endpoint to get userdetails
app.post('/getuserdetails', fetchUser, async (req, res) => {
    console.log('GetUserDetails')
    let userData = await Users.findOne({ _id: req.user.id });
    res.send({ name: userData.name, email: userData.email });
})


app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.log(error);
    }
})

