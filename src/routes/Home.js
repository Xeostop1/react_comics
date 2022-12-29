import { useEffect, useState } from 'react';
import Comics from '../components/Comics';


// const getMovies=async()=>{
//   const json=await(
//     await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year")
//   ).json();
//     setMovies(json.data.movies);
//     setLoading(false);
// }


function Home() {

  //로딩을 보여주는 useState
    const [loading, setLoading]=useState(true);
    const [movies, setMovies]=useState([]);

    const getMovies=async()=>{
      const json=await(
        await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year")
      ).json();
        setMovies(json.data.movies);
        setLoading(false);
    }
  
    useEffect(()=>{
      getMovies()},[]);
      
      
      console.log(movies);
    return (
      <div className="App">
        {loading? <h1>Loading....</h1>:
        <div>{movies.map((it)=>
          <Comics
            key={it.id}
            id={it.id}
            coverImg={it.medium_cover_image}  
            title={it.title}
            year={it.year}
            summary={it.summary}
            genres={it.genres}
          />)}</div>}
      </div>
    );
  }
  export default Home;