const PORT = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const uri =
  "mongodb+srv://rajyaguruachal:i9rHDTXWc5PWXW5n@cluster0.3somj1u.mongodb.net/test";

const app = express();
app.use(cors());
app.use(express.json());

// Default
app.get("/", (req, res) => {
  res.json("Hello to my app");
});

// Sign up to the Database
// Sign up to the Database
app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  console.log(req.body.json);
  const obj = JSON.parse(req.body.json);
  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(obj.password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email: obj.email });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    const sanitizedEmail = obj.email.toLowerCase();

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    const updateDocument = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      password: hashedPassword,
      first_name: obj.first_name,
      dob_dob: obj.dob_dob,
      time_frame: obj.time,
      building_1: obj.building_b,
      // dob_day: formData.dob_day,
      // dob_month: formData.dob_month,
      // dob_year: formData.dob_year,
      show_gender: obj.show_gender,
      gender_identity: obj.gender_identity,
      interest: obj.gender_interest,
      url: obj.url,
      about: obj.about,
      matches: obj.matches,
    };

    const insertedUser = await users.insertOne(updateDocument);
    console.log(insertedUser);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });
    res.status(201).json({ token, userId: generatedUserId });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

// Log in to the Database
app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ email });
    console.log(user)
    const correctPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: user.user_id });
    }

    res.status(400).json("Invalid Credentials");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

// Get individual user
app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

// Update User with a match
app.put("/addmatch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);

    
  } 
  catch(error){ 

    console.log(error)
  }
  finally {
    await client.close();
  }
});

// Get all Users by userIds in the Database
app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();

    res.json(foundUsers);
  } finally {
    await client.close();
  }
});

// Get all the Gendered Users in the Database
// Get all the Gendered Users in the Database
app.get("/gendered-users", async (req, res) => {

  console.log(req.query)
  const client = new MongoClient(uri);
  const gender = req.query.gender_identity;
  const building_1 = req.query.building_1;
  const tf = req.query.time_frame;
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const query = {
      gender_identity: { $eq: gender },
      building_1: { $eq: building_1 },
      time_frame: { $eq: tf },
    };
    const foundUsers = await users.find(query).toArray();
    res.json(foundUsers);
  } finally {
    await client.close();
  }
});

// Update a User in the Database
app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };

    const updateDocument = {
      $set: {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        dob_dob: formData.dob_dob,
        // dob_day: formData.dob_day,
        // dob_month: formData.dob_month,
        // dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };

    const insertedUser = await users.updateOne(query, updateDocument);

    res.json(insertedUser);
  } finally {
    await client.close();
  }
});

// Get Messages by from_userId and to_userId
app.get("/messages", async (req, res) => {
  const { userId, correspondingUserId } = req.query;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };
    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } finally {
    await client.close();
  }
});

// Add a Message to our Database
app.post("/message", async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const insertedMessage = await messages.insertOne(message);
    res.send(insertedMessage);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log("server running on PORT " + PORT));
