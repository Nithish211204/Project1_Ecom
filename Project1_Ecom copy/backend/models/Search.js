const mongoose = require('mongoose');


const Item = mongoose.model("Item", new mongoose.Schema({ name: String }));

// Search API
app.get("/search", async (req, res) => {
    const query = req.query.q;
    try {
        const results = await Item.find({ name: { $regex: query, $options: "i" } });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports =Item;