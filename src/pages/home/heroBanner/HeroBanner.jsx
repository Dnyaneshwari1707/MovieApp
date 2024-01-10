import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

import "./style.scss"
import useFetch from '../../../hooks/useFetch'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const HeroBanner = () => {

   const [backgrounnd, setBackground] = useState(""); 
   const [query, setQuery] = useState("");
   const navigate = useNavigate();
   const {url} = useSelector((state)=> state.home)

   const {data, loading} = useFetch("/movie/upcoming");

   useEffect(()=>{
        const bg =url.backdrop + data?.results?.[Math.floor
            (Math.random() * 20)]?.backdrop_path;
            setBackground(bg);
   },[data])

   const searchQueryHandler = (event) =>{
        if(event.key === "Enter" && query.length > 0){
            navigate(`/search/${query}`)
        }
   }

  return (
    <div className='heroBanner'>
        {!loading && <div className="backdrop-img">
            <Img src={backgrounnd} />
        </div>}

    <div className="opacity-layer"></div>
        <ContentWrapper>

        <div className="heroBannerContent">
            <span className="title">FlickFiesta</span>
            <span className="subTitle">Step into a world where every frame tells a story. </span>
            <span className='subTitle'>Where cinematic magic meets your fingertips, delivering an unparalleled movie, tv shows experience like never before.</span>
            <div className="searchInput">
                <input type="text" 
                placeholder='Discover a universe of entertainment with search...' 
                onChange={(e)=>setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}/>
                <button>Search</button>
            </div>
        </div>
      
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
