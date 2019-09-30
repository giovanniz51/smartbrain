const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();


app.use(cors());

app.use(bodyParser.json());

const db = {
    users: [
        {
            id: "123",
            name: "Gianni",
            email: "gianni@email.com",
            password: "test123",
            entries: 0,
            joined: new Date()
        },
        {
            id: "1234",
            name: "John",
            email: "john@email.com",
            password: "babana",
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get("/", (req,res) => {
    res.send(db.users);
})

app.get("/profile/:id", (req,res) => {
    const user = db.users.find(u => u.id === req.params.id);
    if(user)
        res.json(user);
    else
        res.status(404).json("user not found");
});

app.put("/image", (req,res) => {
    const user = db.users.find(u => u.id === req.params.id);
    if(user){
        user.entries++;
        res.json(user);
    }else {
        res.status(404).json("user not found");
    }
})

app.post("/signin", (req, res) => {
    const user = db.users.find(u => u.email === req.body.email);
    if(user){
        bcrypt.compare(req.body.password, user.hash, function(err, res) {
            if(res)
                res.json("success");
            else
                res.json("password is incorrect");
        });
    }else{
        res.status(404).json("user not found");
    }
})

app.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(hash){
            db.users.push({id: "12345", ...req.body, hash: hash, entries: 0, joined: new Date()});
            res.json(db.users[db.users.length-1]);
        }else{
            res.status(500).json(err);
        }
    });
})


app.listen(process.env.PORT, () => console.log("Server started"));