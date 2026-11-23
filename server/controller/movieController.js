const Movie=require("../models/movie")

const createmovie=async(req,res)=>{
    try{
        const user=await Movie.create({
            movie:req.body.movie,
            director:req.body.director,
            year:req.body.year,
            genre:req.body.genre
        })
        res.json("movie created")
    }
    catch(error){
        res.json({message:"movie not created"})
    }
}

const takeallmovie=async(req,res)=>{
     
    try{
        let response=await Movie.find()
        res.json(response)
    }
    catch(error){
        res.json({message:"no movie found"})
    }
}

const updatemovie=async(req,res)=>{
    try{
        const {id}=req.params

        const response=await Movie.findByIdAndUpdate(id,
            {
                movie:req.body.movie,
                director:req.body.director,
                year:req.body.year,
                genre:req.body.genre
            }
        )
        res.json("updated")
    }
    catch(error){
        res.json({message:"movie not updated"})
    }
}

const removemovie=async(req,res)=>{
    try{
        const {id}=req.params
        const response=await Movie.findByIdAndDelete(id)
        res.json("movie removed")
    }
    catch(error){
        res.json({message:"movie not removed"})
    }
}

const changestatus = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Movie.findById(id);

        response.favorite = !response.favorite;

        await response.save();

        res.json("status changed");
    }
    catch (error) {
        res.json({ message: "status not changed" });
    }
}
const allfavorite = async (req, res) => {
    try {
        const response = await Movie.find({ favorite: true });

        if (response.length === 0) {
            return res.json({ message: "no favorite found" });
        }

        res.json(response);
    }
    catch (error) {
        res.json({ message: "no favorite found" });
    }
}
module.exports={
    createmovie,
    takeallmovie,
    updatemovie,
    removemovie,
    changestatus,
    allfavorite
}