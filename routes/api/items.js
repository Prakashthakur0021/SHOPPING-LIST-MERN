const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Item = require("../../models/Item");

// @route    GET api/items
// @desc     Get All Items
// @access   public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route   POST api/items
// @desc    Create a Item
// @access  public
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route    Delete api/items/id
// @desc     Delete a Post
// @access   public
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
