import mongoose from "mongoose";

const postShema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: false,
    },
    userName:{
        type: String,
        required: true,
        unique: false,
    },
    date:{
        type: Date,
        required: true,
    },
    text:{
        type: String,
        required: true
    },
});

export = mongoose.model("Post",postShema);