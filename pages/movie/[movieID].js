import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Image from "next/image";
import MovieInfo from '../../components/movie/MovieInfo';


function MovieDetails({data}) {
    const Movie = data;
    return(
        <Container maxWidth="sm" style={{margin:'1rem auto'}}>
            <CssBaseline />
            <Image
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${Movie.poster_path}`}
                alt={Movie.original_title}
                width="400px"
                height="600px"
            />
            <div style={{ margin: '1rem auto' }}>
                <MovieInfo movie={Movie} />
            </div>
        </Container>
    )
}


export async function getServerSideProps(context) {
    const movieId = context.params.movieID;
    let endpointForMovieInfo = `${process.env.API_URL}movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`;
    const res = await fetch(endpointForMovieInfo)
    const data = await res.json()
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {data}, // will be passed to the page component as props
    }
  }

export default MovieDetails;