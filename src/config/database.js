const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://guptagopal252:eNAJQAx3HRoIk8kW@cluster0.cj1xi.mongodb.net/devConnect ");
};

module.exports = connectDB;