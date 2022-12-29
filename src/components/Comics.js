import { Link } from "react-router-dom";

function Comics({ rank, id, coverImg, title, summary, genres }){
    return (
    <div>
        <img src={coverImg} alt={title}/>
        <h2><Link to={`/movie/${id}`}>{title}</Link></h2> 
        <span>{rank}</span>
        <ul>
          {genres.map((g)=><li key={g}>{g}</li>)}
        </ul>
        <p>{summary}</p>
    </div>
    );
}

export default Comics;
//보내는쪽에서 :id 하면 이름 명명
//받는곳에서는 같은변수명으로 받으면 됨!