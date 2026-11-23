const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        movie: {
            type: String,
            required: true,
            trim: true
        },

        director: {
            type: String,
            required: true,
            trim: true
        },

        year: {
            type: Number,
            required: true
        },

        genre: {
            type: String,
            required: true
        },

        favorite: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;