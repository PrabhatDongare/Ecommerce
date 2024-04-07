const prisma = require('../config/db.js')
const { validationResult } = require('express-validator');
const otpGenerator = require('otp-generator')
const { transporter } = require('../utils/emailService.js')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// SIGN UP 
exports.userSignUp = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    
    try {
        const { name, email, password } = req.body
        // Check Email
        let user = await prisma.user.findUnique({
            where: { email }
        });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Generate Password Hash
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Generate OTP & Validity Time
        const otp = otpGenerator.generate(8, { digits : true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const currentTime = new Date();
        const validity = new Date(currentTime.getTime() + 120000);    // 2min validity
        
        user = await prisma.signUpOTP.create({
            data: { name, email, password: hashPassword, otp: Number(otp), validity }
        });

        // Send OTP to user
        await transporter.sendMail({
            from: {
                name: "Prabhat Dongare", 
                address: process.env.EMAIL_USERNAME
            },
            to: email, 
            subject: "ECOMMERCE Login OTP",
            text: `Dear User your ECOMMERCE Sign Up OTP is ${otp}`, 
            html: `<b> Dear User your ECOMMERCE Sign Up OTP is ${otp} </b>`, 
          });
        return res.status(200).json({ message: "OTP validity 2 min" })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Verify OTP
exports.verifyOtp = async function (req, res) {
    let success = false;
    try {
        const otp = Number(req.body.otp)
        // Check OTP
        if(!otp || !Number.isInteger(otp) || otp.toString().length !== 8 ){
            return res.status(404).json({ success, message: "Incorrect OTP" })
        }
        
        // Check Validity
        let user = await prisma.signUpOTP.findUnique({
            where: { otp }
        });
        if(!user){
            return res.status(404).json({ success, message: "Otp not requested" })
        }
        // console.log(user)

        const currentTime = new Date();
        if (currentTime > user.validity) {
            return res.status(400).json({ success, message: "OTP Expired" })
        }

        // Add user
        const { name, email, password } = user
        user = await prisma.user.create({
            data: { name, email, password }
        });

        // Delete user from OTP table
        await prisma.signUpOTP.delete({
            where: { otp }
        }); 
        await prisma.userInterest.create({
            data: { 
                userId : user.id,
                interests : []
             }
        });

        const data = { "user": { id: user.id } }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true
        return res.status(200).json({ success, authToken })
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
}


// LOGIN
exports.userLogin = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let success = false;
    try {
        const { email, password } = req.body;
        // Check Email for Login
        let user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(400).json({ success, message: "Email doesn't exists" });
        }

        // Check Password for Login
        const checkPass = await bcrypt.compare(password, user.password)
        if (!checkPass) {
            return res.status(400).json({ success, message: "Incorrect Password !!!" });
        }

        // Auth Token given
        const data = { "user": { id: user.id } }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.status(200).json({ success, authToken, message: "login success at backend" })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
}


// GET USER
exports.getUser = async function (req, res) {
    try {
        userId = req.user.id;
        const userData = await prisma.user.findUnique({
            where: { id: userId },
            // Exclude password
            select: { id: true, name: true, email: true } 
        });
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({userData, message: "Showing User Data..."});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
