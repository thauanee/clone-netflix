import React from 'react';
import './featuredMovie.css';

export default ({item}) => {
    console.log(item);

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for(let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    let description = item.overview;
    if(description.length > 200) {
        description = description.substring(0, 200)+'...';
    }

    return (
       <section className='featured' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
       }}>
            <div className='featured--vertical'>
                <div className='featured--horizontal'>
                    <div className='featured--name'>{item.original_name}</div>
                    <div className='featured--info'>
                        <div className='featured--points'>{item.vote_average} pontos</div>
                        <div className='featured--year'>{firstDate.getFullYear()}</div>
                        <div className='featured--seasons'>{item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>  
                        <div className='featured--description'>{description}</div>
                        <div className='featured--buttons'>
                            <a href={`/watch/${item.id}`} className='featured--watchbutton'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg> Assistir</a>
                            <a href={`/list/add/${item.id}`} className='featured--mylistbutton'>+ Minha Lista</a>
                        </div>
                        <div className='featured--genres'> <strong>Gêneros: </strong> {genres.join(', ')}</div>
                </div>
            </div>
       </section>
    );
}