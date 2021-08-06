import { useRouter } from "next/router";

function MovieDetails() {
    const router = useRouter();

    console.log(router.query.movieID);

    return (
        <h1>Test Page</h1>
    )
}

export default MovieDetails;