import { useEffect, useState } from 'react';
// import { TranslatorProvider, useTranslate } from 'react-translate';
//import axios from 'axios';
import Convert from '../components/Convert';

 //======셀렉트 옵션을 선택하는 배열
 const sortOption=[
  {value:"low", name:"LOW"},
  {value:"high", name:"HIGH"},
]
const seletOption=[
  {value: "ranking", name:"ranking"},
  {value: "score", name:"score"},
]

//====셀렉트 태그를 만들고, 선택한 값으로 옵션값 세팅 함수
const ControlSelet=({value, onChange, options})=>{
  return(
    <select
      className='selectMenu'
      value={value}
      onChange={e=> onChange(e.target.value)}
      >
        {options.map((it,i)=>(
          <option key={i} value={it.value}>
            {it.name}
          </option>))
        };  
    </select>
  );
};


//=====Main====
function Home() {
  //로딩을 보여주는 useState
  const [loading, setLoading]=useState(true);
  //fetch에서 받아온 만화를 담은 배열
  const [manga, setManga]=useState([]);

  //정렬상태를 저장하는 
  //sortType: low/high selectType: ranking, score
  const [sortType, setSortType]=useState("high");
  const [selectType, setSelectType]=useState("RANKING");
  


  //변경 타입을 받아서 분기를 세팅하고 싶었으나 포기~~
  const getFilterManaList=()=>{
    const compare=(a,b)=>{
      if(sortType==="high"){
        return parseInt(a.popularity)-parseInt(b.popularity);
      }else{
        return parseInt(b.popularity)-parseInt(a.popularity);
      }
  };
    //복사한 배열로 정렬하기
    const copyList=JSON.parse(JSON.stringify(manga));
    // const filteredList=type==="ranking" ? copyList: copyList.filter(it=>selectCallback(it));
    const sortList=copyList.sort(compare);
    return sortList;
  }

//===만화 API 가지고오는 함수
    const getMovies=async()=>{
      const json=await(
        await fetch("https://api.jikan.moe/v4/manga")
      ).json(); // console.log(json.data);  
        setManga(json.data);  //setMovies(json.data.movies);
        setLoading(false);
    }
    useEffect(()=>{
      getMovies()},[]);
      
      //0102 정렬함수 추가 작동확인
      function sortData(item){
        item.sort((a,b)=>{
          //인기순 오름차순
          if(a.popularity>b.popularity) return 1;
          if(a.popularity<b.popularity) return -1;
          // 평점 내림차순
          // if(a.score>b.score) return -1;
          // if(a.score<b.score) return 1;
        });
        return item;
      };
      sortData(manga);
      //console.log(manga);

      //=======이미지 배경 컨버터==========
      function converImgBg(e) {
        console.log("으어", e.target.src);
          return ( 
            <div className='App'
              style={{
                // border:"1px solid red"
                backgroundSize:"cover",
                backgroundImage:`url("${e.target.src}")`,
                backgroundPosition:"center center"
              }}
            >
            </div>
          )
        }
      


    return (
      <div className="App">
        {loading? <h1>Loading....</h1>:
        <div className='itemList'>
          <h1>HOT MANGA RANKING</h1>
          <ControlSelet
            value={sortType}
            onChange={setSortType}
            options={sortOption}
          />
          {/* <ControlSelet
            value={selectType}
            onChange={setSelectType}
            options={seletOption}
          /> */}
          {getFilterManaList().map(it=>(
          <div className='itemManga'>
            <img className={it.title} src={it.images.jpg.image_url} onClick={converImgBg}/>
              <h2>{it.title}</h2>
              {/* <span>{it.mal_id}</span> */}
              <p className='p_ranking'>Ranking <span className='rankingNum'> {it.popularity} </span> 
                / 평점: {it.score}</p>
              <details>
                <summary>시놉시스</summary>
                <p><Convert text={it.synopsis} language="ko"/></p>
              </details>
          </div>
        ))
        }
        </div>}
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

  //{/* <p>{it.synopsis}</p> */}