const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const secretKey = 'dkjadkjn2kjn1kj352n62kjrehj2bf28839ru2893r1hf893hb293hbfc3uewnd10923109e2'

const registerUser = async (req, res) => {
  try {
    console.log('registerPassword', req.body.password)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await db.user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).send(user)
  } catch (err) {
    console.log("An error occured while registering user", err);
    res.status(500).send(err)
  }
};

const login = async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        if(!user){
            return res.json({status: 400, message: 'User does not exist!'})
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordCorrect){
            const token = jwt.sign({
                name: user.name,
                email: user.email
            }, secretKey);
            const newUserObject = {
                ...user.dataValues,
                token
            }

            delete newUserObject.password

            return res.json({status: 200, newUserObject})
        } else {
            return res.json({status: 400, message: 'Wrong Password!'})
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    registerUser,
    login
}
