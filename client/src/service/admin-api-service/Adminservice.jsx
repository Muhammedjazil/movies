import React from "react"
import useAxiosPrivate from "../../hooks/Useaxiosprivate"

export const Adminservice=()=>{
  const axiosPrivate=useAxiosPrivate()
    const createmovie=async(data)=>{
          let response=await axiosPrivate.post("/movie",data)
          return response.data
    }

    const takemovie=async()=>{
        let response=await axiosPrivate.get("/movie")
        return response.data;
    }

    const updatemovie=async(id,data)=>{
        let response=await axiosPrivate.put(`/movie/${id}`,data)
        return response.data;
    }

    const movieremove=async(id)=>{
        let response=await axiosPrivate.delete(`/movie/${id}`)
        return response.data;
    }

    const changefavorite=async(id)=>{
    let response= await axiosPrivate.put(`/movie/fav/${id}`)
    return response.data;
    }

    const getallfav=async()=>{
        let response=await axiosPrivate.get("/movie/allfav")
    return response.data;

    }

    return{
createmovie,
takemovie,
updatemovie,
movieremove,
changefavorite,
getallfav
    }
}