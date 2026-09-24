import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { generateOTP } from "../services/otpService.js";

export const signup = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            contact,
            role,
            cnic_number
        } = req.body;

        // Check existing user
        const existingUser = await User.findOne({
            where: { email }
        });
        if(existingUser){
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Seller CNIC upload
        let cnic_front = null;
        let cnic_back = null;

        if(role === "seller"){

            if(!req.files?.cnic_front || !req.files?.cnic_back){
                return res.status(400).json({
                    message: "CNIC images required for seller"
                });
            }

            cnic_front = req.files.cnic_front[0].filename;
            cnic_back = req.files.cnic_back[0].filename;
        }

        // Create user
        const user = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            contact,
            role,
            cnic_number,
            cnic_front,
            cnic_back
        });

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await user.update({
            otp,
            otpExpiry,
            isVerified: false
        });

        // HACK: console OTP (for testing)
        console.log("OTP for user:", otp);

        res.status(201).json({
            message: "Signup successful. OTP sent to your contact.",
            userId: user.id
        });

    } catch(error){
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if(!user){
            return res.status(400).json({
                message: "Invalid email"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your account first"
            });
        }
        
        // Create token
        const token = jwt.sign({
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist" });
        }

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await user.update({
            otp,
            otpExpiry
        });

        // HACK: console OTP (for testing/development since no email service is hooked up)
        console.log(`[Forgot Password] OTP for ${email}:`, otp);

        res.status(200).json({
            message: "OTP has been sent."
        });

    } catch (error) {
        console.log("Forgot Password Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (new Date() > new Date(user.otpExpiry)) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear OTP
        await user.update({
            password: hashedPassword,
            otp: null,
            otpExpiry: null
        });

        res.status(200).json({ message: "Password has been reset successfully" });

    } catch (error) {
        console.log("Reset Password Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};