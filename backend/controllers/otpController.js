import { User } from "../models/User.js";
import { generateOTP } from "../services/otpService.js";

export const verifyOTP = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP expired" });
        }
        await user.update({ 
            isVerified: true,
            otp: null,
            otpExpiry: null
        });
        res.status(200).json({
            message: "Account verified successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const resendOTP = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await user.update({
            otp,
            otpExpiry
        });

        // HACK: console OTP (for testing)
        console.log(`NEW OTP for user ${user.id}:`, otp);

        res.status(200).json({
            message: "New OTP generated and sent to your contact."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};