
const express=require("express")
const router=express.Router()
const {createmovie,takeallmovie,updatemovie,removemovie,changestatus,allfavorite}=require("../controller/movieController")

router.post("/",createmovie)

router.get("/",takeallmovie)

router.put("/:id",updatemovie)

router.delete("/:id",removemovie)

router.put("/fav/:id",changestatus)

router.get("/allfav",allfavorite)

module.exports=router