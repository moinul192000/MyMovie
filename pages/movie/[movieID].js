import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Image from "next/image";
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../lib/config'
import MovieInfo from '../../components/movie/MovieInfo';

function MovieDetails(props) {
    const router = useRouter();
    const movieId = router.query.movieID;
    
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const movieVariable = {
        movieId: movieId
    }
    
    useEffect(() => {

        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)
    }, [])

    const fetchDetailInfo = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setCasts(result.cast)
                    })

                setLoadingForCasts(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }
    return (
        <div>
            {/* Header */}
            {!LoadingForMovie ?
                <Image
                    src={`${IMAGE_BASE_URL}${Movie.poster_path}`}
                    alt={Movie.original_title}
                    width="400px"
                    height="600px"
                />
                :
                <div>loading...</div>
            }
             <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {/* <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} /> */}
                </div>


                {/* Movie Info */}
                {!LoadingForMovie ?
                    <MovieInfo movie={Movie} />
                    :
                    <div>loading...</div>
                }

                <br />
            </div>
        </div>
    )
}

export default MovieDetails;