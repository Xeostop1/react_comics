import { useEffect, useState } from 'react';
//import Comics from '../components/Comics';


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
    const [manga, setManga]=useState([]);

    const getMovies=async()=>{
      const json=await(
        await fetch("https://api.jikan.moe/v4/manga")
      ).json();
        console.log(json.data);  
        setManga(json.data);
        //setMovies(json.data.movies);
        setLoading(false);
    }
  
    useEffect(()=>{
      getMovies()},[]);
      
      console.log(manga);
      //console.log(movies);
      //console.log(manga.map(it=>it));
    return (
      <div className="App">
        {loading? <h1>Loading....</h1>:
        <div>{manga.map(it=>(
          <div>
            만화제목: {it.title}<br/>
            {it.mal_id}<br/>
            인기순위: {it.popularity}<br/>
            평점: {it.score}
            <img src={it.images.jpg.image_url}/>
            <p>시놉시스:{it.synopsis}</p>
          </div>
        ))
        }</div>}
      </div>
    );
  }
  export default Home;

  // <Comics
  //           key={it.mal_id}
  //           id={it.mal_id}
  //           coverImg={it.images.jpg.image_url}  
  //           title={it.title}
  //           summary={it.synopsis}
  //           genres={it.genres}
  //           rank={it.popularity}
  //         />