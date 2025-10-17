import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All 3 are required",
                success: false
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists !",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 16);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1D'});

        return res.status(201).cookie('token', token, {maxAge: 1*24*60*60*1000, httpsOnly: true, sameSite: 'strict'}).json({
            message: `New User registered successfully !`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "All 2 are required",
            success: false
        })
    }

    let user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "User with this email does not exists !",
            success: false
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Incorrect email or password",
            success: false
        })
    }

    const tokenData = {
        userId: user._id
    }

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1D' });

    user = {
        _id: user._id,
        name: user.name,
        email: user.email
    }

    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
        message: `Welcome back ${user.name}`,
        user,
        success: true
    })
}

