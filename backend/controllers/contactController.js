import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    const newContact = await Contact.create({
      name,
      email,
      phone,
      category,
      message,
    });

    res.status(201).json({ message: "Thank you! Your message has been received.", contact: newContact });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
