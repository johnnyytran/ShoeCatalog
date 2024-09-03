const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");
const path = require("path");

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format

const port = 8081; // Port on which the server will listen
const host = "localhost"; // Host address
const url = "mongodb://127.0.0.1:27017"; // MongoDB connection URL
const dbName = "finalproject"; // MongoDB database name
const client = new MongoClient(url); // MongoDB client instance

// Start the server
app.listen(port, host, () => {
    console.log(`App listening at http://${host}:${port}`);
});

// READ operation: Retrieve a list of shoes
app.get("/listshoes", async (req, res) => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect(); // Connect to the MongoDB client
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName); // Access the database from the client
        const query = {}; // Define an empty query to retrieve all shoes
        const results = await db.collection("shoes").find(query).limit(100).toArray(); // Retrieve shoes from the "shoes" collection

        console.log(results);
        res.status(200).send(results); // Send the list of shoes as a response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error"); // Send an error response if there's an issue
    } finally {
        await client.close(); // Close the MongoDB client connection
        console.log("MongoDB connection closed");
    }
});

// READ operation: Retrieve a list of shoe images
app.get("/listimages", async (req, res) => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect(); // Connect to the MongoDB client
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName); // Access the database from the client
        const query = {}; // Define an empty query to retrieve all shoes
        const results = await db.collection("shoes").find(query).toArray(); // Retrieve shoes from the "shoes" collection

        const images = results.map(shoe => shoe.image); // Extract image URLs from shoe documents

        console.log("List of images:", images);
        res.status(200).send(images); // Send the list of images as a response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error"); // Send an error response if there's an issue
    } finally {
        await client.close(); // Close the MongoDB client connection
        console.log("MongoDB connection closed");
    }
});

// READ operation: Retrieve Nike shoes
app.get("/listNike", async (req, res) => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect(); // Connect to the MongoDB client
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName); // Access the database from the client
        const query = { brand: "Nike" }; // Define a query to retrieve Nike shoes
        const results = await db.collection("shoes").find(query).toArray(); // Retrieve Nike shoes from the "shoes" collection

        console.log("Nike shoes:", results);
        res.status(200).send(results); // Send the list of Nike shoes as a response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error"); // Send an error response if there's an issue
    } finally {
        await client.close(); // Close the MongoDB client connection
        console.log("MongoDB connection closed");
    }
});

// READ operation: Retrieve Jordan shoes
app.get("/listJordan", async (req, res) => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect(); // Connect to the MongoDB client
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName); // Access the database from the client
        const query = { brand: "Jordan" }; // Define a query to retrieve Nike shoes
        const results = await db.collection("shoes").find(query).toArray(); // Retrieve Nike shoes from the "shoes" collection

        console.log("Jordan shoes:", results);
        res.status(200).send(results); // Send the list of Nike shoes as a response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error"); // Send an error response if there's an issue
    } finally {
        await client.close(); // Close the MongoDB client connection
        console.log("MongoDB connection closed");
    }
});

// READ operation: Retrieve Adidas shoes
app.get("/listAdidas", async (req, res) => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect(); // Connect to the MongoDB client
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName); // Access the database from the client
        const query = { brand: "Adidas" }; // Define a query to retrieve Nike shoes
        const results = await db.collection("shoes").find(query).toArray(); // Retrieve Nike shoes from the "shoes" collection

        console.log("Adidas shoes:", results);
        res.status(200).send(results); // Send the list of Nike shoes as a response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error"); // Send an error response if there's an issue
    } finally {
        await client.close(); // Close the MongoDB client connection
        console.log("MongoDB connection closed");
    }
});

// READ operation: Retrieve New Balance shoes
app.get("/listNewBalance", async (req, res) => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect(); // Connect to the MongoDB client
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName); // Access the database from the client
        const query = { brand: "New Balance" }; // Define a query to retrieve Nike shoes
        const results = await db.collection("shoes").find(query).toArray(); // Retrieve Nike shoes from the "shoes" collection

        console.log("New Balance shoes:", results);
        res.status(200).send(results); // Send the list of Nike shoes as a response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error"); // Send an error response if there's an issue
    } finally {
        await client.close(); // Close the MongoDB client connection
        console.log("MongoDB connection closed");
    }
});

// DELETE operation: Remove a product from the cart
app.delete('/cart/getcarted/:id', async (req, res) => {
    const productId = req.params.id; // Extract the product ID from the request params

    try {
        console.log('Product ID:', productId); // Log the value of productId

        await client.connect(); // Connect to the MongoDB client
        const db = client.db(dbName); // Access the database from the client

        const result = await db.collection('cart').deleteOne({ id: parseInt(productId) }); // Delete the product from the cart

        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Product not found' }); // Send a 404 response if the product is not found
        } else {
            res.status(204).send(); // Send a 204 response if the product is successfully deleted
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' }); // Send a 500 response if there's an internal server error
    } finally {
        await client.close(); // Close the MongoDB client connection
    }
});

// CREATE operation: Add an item to the cart
app.post("/cart/addtocart", async (req, res) => {
    try {
        await client.connect(); // Connect to the MongoDB client
        const db = client.db(dbName); // Access the database from the client

        // Extract necessary data from the request body
        const { sessionId, id, quantity, size, price, name, image } = req.body;

        // Check if the shoe already exists in the cart for the given session and size
        const existingItem = await db.collection("cart").findOne({ sessionId, id, size });

        if (existingItem) {
            // If the item already exists, increment the quantity and update the price
            await db.collection("cart").updateOne(
                { _id: existingItem._id },
                { $inc: { quantity: 1 }, $set: { price: existingItem.price + price } }
            );
            res.status(200).send("Item quantity incremented in the cart"); // Send a success message
        } else {
            // If the item doesn't exist, insert it into the cart collection
            const result = await db.collection("cart").insertOne({
                sessionId,
                id,
                quantity,
                size,
                price: price * quantity, // Multiply the price by quantity
                name,
                image // Store the image data
            });
            if (result && result.ops && result.ops.length > 0) {
                res.status(200).send(result.ops[0]); // Send back the inserted document
            } else {
                res.status(500).send("Failed to add item to cart"); // Send an error message if insertion fails
            }
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error"); // Send a 500 response if there's an internal server error
    } finally {
        await client.close(); // Close the MongoDB client connection
    }
});

// READ operation: Retrieve all items from the cart
app.get("/cart/getallcartitems", async (req, res) => {
    try {
        await client.connect(); // Connect to the MongoDB client
        const db = client.db(dbName); // Access the database from the client

        // Find all items in the cart
        const results = await db.collection("cart").find({}).toArray();

        // Map the results to include all necessary fields (shoe name, size, quantity, price, and image)
        const shoes = results.map(item => ({
            id: item.id,
            name: item.name,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
            image: item.image // Assuming the image URL is stored in the 'image' field
        }));

        res.status(200).send(shoes); // Send the list of cart items as a response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error"); // Send an error response if there's an issue
    } finally {
        await client.close(); // Close the MongoDB client connection
    }
});

// READ operation: Retrieve a specific cart item by ID
app.get("/cart/getcart/:id", async (req, res) => {
    const cartItemId = parseInt(req.params.id); // Assuming id is an integer
    try {
        await client.connect(); // Connect to the MongoDB client
        const db = client.db(dbName); // Access the database from the client
        const result = await db.collection("cart").findOne({ id: cartItemId }); // Find the cart item by ID
        if (!result) {
            res.status(404).json({ message: "Item not found in cart" }); // Send a 404 response if the item is not found
        } else {
            res.status(200).json(result); // Send the cart item as a response
        }
    } catch (error) {
        console.error("Error fetching item from cart by ID:", error);
        res.status(500).json({ message: "Internal server error" }); // Send a 500 response if there's an internal server error
    } finally {
        await client.close(); // Close the MongoDB client connection
    }
});
