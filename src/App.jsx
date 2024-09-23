import React, { useEffect, useState } from 'react';
import './App.css';
import {tmdb} from './tmdb';
import FeaturedMovie from './component/featuredMovie';
import MovieRow from './component/movieRow';
import Header from './component/Header'

export default function App(){

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);  
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=> {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await tmdb.getHomeList();
      setMovieList(list);
   
    // Pegando o Featured
    let originals = list.filter(i=>i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await tmdb.getMovieInfo(chosen.id,'tv');
    setFeaturedData(chosenInfo);
 }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }

    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  })

  return (
    <div className='page'>
      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role='img' aria-label='coração'>❤️</span> <br/>
        Direitos de imagem para Netflix <br/>
        Dados pegos do site Themoviedb.og
      </footer>
        
        {movieList.length <= 0 &&
        <div className='loading'>
          <img src="https://i.gifer.com/8Etj.gif" alt="Carregando" />
        </div>
        }
      </div>
  );
}
