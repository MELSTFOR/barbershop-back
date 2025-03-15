const { Barber, StockItem, Profile } = require("../models");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const getAllBarbers = async (req, res) => {
  try {
    const barbers = await Barber.findAll();
    res.json(barbers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBarberById = async (req, res) => {
  try {
    const barber = await Barber.findByPk(req.params.id);
    if (barber) {
      res.json(barber);
    } else {
      res.status(404).json({ message: "Barber not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBarber = async (req, res) => {
  try {
    const { name, phone, email, idNumber, startDate } = req.body;
    let profilePicture = req.file
      ? path.posix.join("uploads", req.file.filename)
      : null;

    // Reemplazar las barras invertidas por barras normales
    if (profilePicture) {
      profilePicture = profilePicture.replace(/\\/g, "/");
    }

    // Log the request body and file
    console.log(req.body);
    console.log(req.file);

    const newBarber = await Barber.create({
      name,
      phone,
      email,
      idNumber,
      startDate,
      profilePicture,
    });
    res.status(201).json(newBarber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBarber = async (req, res) => {
  try {
    const updatedBarber = await Barber.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.json(updatedBarber[1][0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBarber = async (req, res) => {
  try {
    await Barber.destroy({ where: { id: req.params.id } });
    res.json({ message: "Barber deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllStockItems = async (req, res) => {
  try {
    const stockItems = await StockItem.findAll();
    res.json(stockItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStockItemById = async (req, res) => {
  try {
    const stockItem = await StockItem.findByPk(req.params.id);
    if (stockItem) {
      res.json(stockItem);
    } else {
      res.status(404).json({ message: "Stock item not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createStockItem = async (req, res) => {
  try {
    const { name, quantity, unit, minStock, lastUpdate } = req.body;
    const newStockItem = await StockItem.create({
      name,
      quantity,
      unit,
      minStock,
      lastUpdate,
    });
    res.status(201).json(newStockItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addStockItem = async (req, res) => {
  try {
    const stockItem = await StockItem.findByPk(req.params.id);
    if (!stockItem) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    const { quantity } = req.body;
    stockItem.quantity += quantity;
    await stockItem.save();

    res.json(stockItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const subtractStockItem = async (req, res) => {
  try {
    const stockItem = await StockItem.findByPk(req.params.id);
    if (!stockItem) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    const { quantity } = req.body;
    const newQuantity = stockItem.quantity - quantity;
    if (newQuantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
    }
    stockItem.quantity = newQuantity;
    await stockItem.save();

    res.json(stockItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteStockItem = async (req, res) => {
  try {
    await StockItem.destroy({ where: { id: req.params.id } });
    res.json({ message: "Stock item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        ownerName: "",
        ownerPhoto: "",
        ownerPhone: "",
        ownerEmail: "",
        ownerDNI: "",
        businessName: "",
        businessLogo: "",
        businessAddress: "",
        businessPhone: "",
        businessEmail: "",
      });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedProfile = await Profile.upsert(req.body, { returning: true });
    res.json(updatedProfile[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllBarbers,
  getBarberById,
  createBarber: [upload.single("profilePicture"), createBarber],
  updateBarber,
  deleteBarber,
  getAllStockItems,
  getStockItemById,
  createStockItem,
  addStockItem,
  subtractStockItem,
  deleteStockItem,
  getProfile,
  updateProfile,
};
