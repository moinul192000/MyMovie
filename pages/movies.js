import Link from 'next/link'
import Button from '@material-ui/core/Button';

function Movies() {
  return (
    <div>
      <h1>Movies</h1>
      <Button 
        variant="contained"
        color="secondary"
        style={{'marginLeft':'1em'}}
      >
        <Link href="/movie/TestMovie" passHref>Movie 1</Link>
      </Button>
    </div>
)}
  
export default Movies