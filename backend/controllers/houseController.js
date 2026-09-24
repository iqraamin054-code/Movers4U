import { House } from "../models/House.js";
import { User } from "../models/User.js";

// SELLER FUNCTIONALITY
// CREATE HOUSE
export const createHouse = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            size,
            rooms,
            price,
            city,
            address
        } = req.body;

        const imagePaths = req.files.map(
            file => file.path
        );

        const newHouse = await House.create({
            title,
            description,
            category,
            size,
            rooms,
            price,
            city,
            address,
            images: imagePaths,
            seller_id: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Property submitted successfully. Wait for admin approval.",
            house: newHouse
        });
    }
    catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// GET APPROVED HOUSES
export const getApprovedHouses = async (req, res) => {
    try {
        const houses = await House.findAll({
            where: {
                status: "approved"
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });
        res.status(200).json(houses);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// GET SINGLE HOUSE
export const getSingleHouse = async (req, res) => {
    try {
        const house = await House.findByPk(
            req.params.id,
            {
                include: [
                    {
                        model: User,
                        as: "seller",

                        attributes: [
                            "first_name",
                            "last_name",
                            "contact"
                        ]
                    }
                ]
            }
        );

        if (!house) {
            return res.status(404).json({
                message: "House not found"
            });
        }
        house.views += 1;

        await house.save();

        res.status(200).json(house);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// SELLER OWN HOUSES
export const getSellerHouses = async (req, res) => {
    try {
        const houses = await House.findAll({
            where: {
                seller_id: req.user.id
            }
        });

        res.status(200).json(houses);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// ADMIN PENDING HOUSES
export const getPendingHouses = async (req, res) => {
    try {
        const houses = await House.findAll({
            where: {
                status: "pending"
            }
        });
        res.status(200).json(houses);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// ADMIN APPROVE HOUSE
export const approveHouse = async (req, res) => {
    try {
        const house = await House.findByPk(
            req.params.id
        );

        if (!house) {
            return res.status(404).json({
                message: "House not found"
            });
        }

        house.status = "approved";

        await house.save();

        res.status(200).json({
            message: "House approved"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// ADMIN REJECT HOUSE
export const rejectHouse = async (req, res) => {
    try {
        const house = await House.findByPk(
            req.params.id
        );

        if (!house) {
            return res.status(404).json({
                message: "House not found"
            });
        }

        house.status = "rejected";

        await house.save();

        res.status(200).json({
            message: "House rejected"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const buyHouse = async (req, res) => {
    try {
        const house = await House.findByPk(req.params.id);

        if (!house) {
            return res.status(404).json({ message: "House not found" });
        }

        if (house.status !== "approved") {
            return res.status(400).json({
            message: "House not approved yet"
        });
        }

        if (house.isSold) {
            return res.status(400).json({
            message: "House already sold"
        });
        }

        house.isSold = true;
        house.soldTo = req.user.id;
        house.soldAt = new Date();

        await house.save();

        res.status(200).json({
            success: true,
            message: "House purchased successfully",
            house
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getHousesByStatus = async (req, res) => {
    try {

        const houses = await House.findAll({
            where: {
                status: req.params.status
            },

            order: [
                ["createdAt", "DESC"]
            ]
        });

        res.status(200).json(houses);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const getAllHouses = async (req, res) => {
  try {
    const houses = await House.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(houses);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching houses",
    });
  }
};

export const updateHouseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const house = await House.findByPk(id);

    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }

    house.status = status;
    await house.save();

    res.json({ message: "House status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating status" });
  }
};