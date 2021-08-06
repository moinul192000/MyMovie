import Link from 'next/link'
import Button from '@material-ui/core/Button';
import Search from '../components/search/Search';
import Styles from '../styles/Movies.module.css'

export default function AddMovies() {
  return (
    <div className={Styles.container}>
      <h1>Search and Add your Favourite Movies</h1>
      <Search />
    </div>
)}
