const { MongoClient } = require("mongodb");
const { google } = require("googleapis");

const uri =
  "mongodb+srv://arsalanahmed:password%40123@cluster0.86u7v.mongodb.net/Data_Visualization?retryWrites=true&w=majority";
const dbName = "Data_Visualization";
const collectionName = "sheetData";

async function connectToMongoDB() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB");
  return client.db(dbName).collection(collectionName);
}

async function readSheet() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "secrets.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0";
  const range = "Sheet3";

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (error) {
    console.error("Error reading sheet:", error);
    throw error;
  }
}

async function storeDataInMongoDB() {
  try {
    const data = await readSheet();
    console.log("Sheet data fetched:", data);

    const headers = data[0];
    const rows = data.slice(1);

    const documents = rows.map((row) => {
      const doc = {};
      headers.forEach((header, index) => {
        doc[header] = row[index] || null;
      });
      return doc;
    });

    console.log("Documents to insert:", documents);
    const collection = await connectToMongoDB();
    await collection.insertMany(documents);
    console.log("Data inserted into MongoDB successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

// storeDataInMongoDB();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dataRoutes = require("../backend/routes/DataRoutes.js");
const userRoute = require("../backend/routes/UserRoute.js");
const protect = require("../backend/middleware/jwtAuth.js");

const app = express();

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.use(cors());

app.use(express.json());  

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes
app.use("/api", dataRoutes);

// UserRoutes
app.use("/api/users", userRoute);

// Protect route should come after user and data routes
app.get("/api/protected", protect, (req, res) => {
  res.status(200).json({
    message: "You have access to protected data",
    user: req.user,
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
