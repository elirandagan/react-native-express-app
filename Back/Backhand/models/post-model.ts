import mongoose from "mongoose";

const postShema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    userName:{
        type: String,
        required: true,
        unique: true,
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