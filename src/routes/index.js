const express = require("express");
const router = express.Router();
const {
  getAllBarbers,
  getBarberById,
  createBarber,
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
} = require("../controllers/index");

// Barbers routes
router.get("/barbers", getAllBarbers);
router.get("/barbers/:id", getBarberById);
router.post("/barbers", createBarber);
router.put("/barbers/:id", updateBarber);
router.delete("/barbers/:id", deleteBarber);

// StockItem routes
router.get("/stockitems", getAllStockItems);
router.get("/stockitems/:id", getStockItemById);
router.post("/stockitems", createStockItem);
router.put("/stockitems/add/:id", addStockItem);
router.put("/stockitems/subtract/:id", subtractStockItem);
router.delete("/stockitems/:id", deleteStockItem);

// Profile routes
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

module.exports = router;
