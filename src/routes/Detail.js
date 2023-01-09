import { useParams } from "react-router-dom";
import {useEffect, useState} from "react"




function Detail() {
    const [loading, setLoading]=useState(true);
    const [movie, setMovie]=useState([]);
    const {id}=useParams();
    const getMovie=async ()=>{
        const json = await(await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setMovie(json.data.movie);
        setLoading(false);
        console.log(json);
    }
    useEffect(()=>{
        getMovie();
    },[]);
    
    return (
        <div>
            {loading ? <h1>Loading...</h1>:
        <div className="detail">
           <img src={movie.medium_cover_image}/>
           <h2>{movie.title}</h2>
           <span>{movie.year}</span><br/>
           <span>{movie.genres.map(it=>it).join(" / ")}</span>

        </div>
            
            
        
    
    }
    </div>);
}
export default Detail;