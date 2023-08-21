const mongoose = require("mongoose");
const { connect } = require("../routes/tasks");

const connectDB = (url) => {
    return mongoose
    .connect(url)
    .then(() => console.log("データベースと接続中・・・"))
    .catch((err) => console.log(err))
};

module.exports = connectDB;