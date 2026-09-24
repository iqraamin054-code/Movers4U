import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import houseRoutes from "./routes/houseRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Movers4U API Running");
});

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/otp", otpRoutes);
app.use("/api/houses", houseRoutes);
app.use("/api/contact", contactRoutes);

await sequelize.sync({ alter: true })
.then(() => {
    console.log("Tables Created");

    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });

})
.catch((error) => {
    console.log(error);
});



