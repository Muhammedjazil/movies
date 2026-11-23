import { useState,useEffect } from "react";
import "./movie.css"
import { Adminservice } from "../../service/admin-api-service/Adminservice";
export const Movies=()=>{
    const {createmovie,takemovie,updatemovie,movieremove,changefavorite,getallfav}=Adminservice()
    const[activetab,setActivetab]=useState("movie")
    const[movie,setMovie]=useState([])
    const[view,setView]=useState({})
    const[edit,setEdit]=useState()
    const[fav,setFav]=useState([])
    const[formdata,setFromdata]=useState({
        movie:"",
        director:"",
        year:"",
        genre:""
    }

    )

    const handlechange=(e)=>{
        setFromdata((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const handlesubmit=async(e)=>{
            e.preventDefault();
        try{

            if(edit!=null){

                let response=await updatemovie(edit,formdata)
                await getallmovie()
                console.log("upadted====");
                
                setActivetab("movie")

            }
            else{

            
        let response=await createmovie(formdata)
       console.log(response);
       setActivetab("movie")
       await getallmovie()
       }
       
        }
        catch(error){
            console.log("no movie found!");
            
        }

    }
  const getallmovie=async()=>{
    let response=await takemovie()
    setMovie(response)
    console.log(response);
    

  }

const takealfavorite = async () => {
    let response = await getallfav();

    if (Array.isArray(response)) {
        setFav(response);
    } else {
        setFav([]);
    }

    console.log(response);
}
  useEffect(()=>{
    getallmovie();
    takealfavorite();
  },[])


 const handleview=async(id,value)=>{
    setEdit(id)
    setView(value)
    setActivetab("view")
 }

 const handleviewedit=()=>{
    setFromdata(view)
    setActivetab("newmovie")
 }

 const handleedit=(id,data)=>{
    setEdit(id)
    setFromdata(data)
    setActivetab("newmovie")


 }

 const handledelete=async(id)=>{
    let response=await movieremove(id)
    await getallmovie()
 }

 const handlefavrite = async (id) => {
    await changefavorite(id);

    await getallmovie();
    await takealfavorite();
}


  
    return(
        <div className="movie">
          <button onClick={()=>{setActivetab("movie")}}>Movies</button><button onClick={()=>{setActivetab("newmovie")}}>Add movies</button>
          {activetab=="movie" && (
            <div className="movietable">
                <table>
                    <thead>
                      
                        <tr>
                            <th>movie</th>
                            <th>director</th>
                            <th>release year</th>
                            <th>genre</th>
                            <td>actions</td>
                            <td>favorite/non favorite</td>
                        </tr>
                    </thead>
                    <tbody>

                          {movie.map((value)=>(
                            <tr>
                            <td>{value.movie}</td>
                            <td>{value.director}</td>
                            <td>{value.year}</td>
                            <td>{value.genre}</td>
                            <td><button onClick={()=>{handleview(value._id,value)}}>view</button>
                            <button onClick={()=>{handleedit(value._id,value)}}>edit</button>
                            <button onClick={()=>{handledelete(value._id)}}>delete</button></td>
                            <td>
                                 {value.favorite ? (<button onClick={()=>{handlefavrite(value._id)}}>favorite</button>):
                                 ( <button onClick={()=>{handlefavrite(value._id)}}>non favorite</button>)}
                                 </td>
                               
                        </tr>
                        ))}
                        
                    </tbody>
                </table>

            <div className="favorite">

                <h2>my Favorite</h2>
                <table>
                    <thead>
                        <tr>
                               <th>movie</th>
                            <th>director</th>
                            <th>release year</th>
                            <th>genre</th>
                        </tr>
                    </thead>
                    <tbody>
                 {fav.map((value)=>(
                <tr key={value._id}>
                    <td>{value.movie}</td>
                    <td>{value.director}</td>
                    <td>{value.year}</td>
                    <td>{value.genre}</td>
                </tr>
                 ))}
                 </tbody>
                 </table>
                </div>

            </div>
            )}

            {activetab=="newmovie" && (
                <div className="newmovie">

                    <form onSubmit={handlesubmit}>
                        <input type="text" name="movie" value={formdata.movie} placeholder="enter the movie name" onChange={handlechange}/>
                        <br/>
                         <input type="text" name="director" value={formdata.director} placeholder="enter the director name" onChange={handlechange}/>
                        <br/>
                     <input type="number" name="year" value={formdata.year} placeholder="enter release year " onChange={handlechange}/>
                        <br/>  
             
              <input type="text" name="genre" value={formdata.genre} placeholder="enter the genre" onChange={handlechange}/>
                        <br/>
                   
                    <button>cancel</button>
                    {edit!=null ? (<button type="submit">update</button>):(<button type="submit">add</button>)}
                     </form>
                    </div>
            )}

            {activetab=="view" && (
                <div className="view">
                 <h6>{view.movie}</h6>
                 <h6>{view.director}</h6>
                 <h6>{view.year}</h6>
                 <h6>{view.genre}</h6>

                 <button onClick={()=>{setActivetab("movie")}}>cancel</button>
                 <button onClick={handleviewedit}>edit</button>
                    </div>
            )}
        </div>
    )
}