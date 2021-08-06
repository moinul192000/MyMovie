import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './search.module.css'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save';
import { More } from '@material-ui/icons';

export default function Search() {
  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const searchEndpoint = (query) => `https://api.themoviedb.org/3/search/movie?api_key=5141d7a0abc49eab8535bd52a309a9f9&language=en-US&query=${query}&page=1&include_adult=false`
  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      fetch(searchEndpoint(query))
        .then(res => res.json())
        .then(res => {
          setResults(res.results)
        })
    } else {
      setResults([])
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])

	async function addToUser(value){
		console.log(value);
		const res = await fetch(`
		https://api.themoviedb.org/3/movie/${value.id}?api_key=5141d7a0abc49eab8535bd52a309a9f9&language=en-US`)
		const data = await res.json()
    console.log(data);
	}
  return (
    <div
      className={styles.container}
      ref={searchRef}
    >
      <input
        className={styles.search}
        onChange={onChange}
        onFocus={onFocus}
        placeholder='Search Movies'
        type='text'
        value={query}
      />
      
      
      { active && results.length > 0 && (
        <div className={styles.results}>
          {results.map(({ id, title,poster_path, overview }) => (
            <div className={styles.result} key={id}>
              <Image src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${poster_path}`} alt="" width={250} height={350}/>
              <p>Name: {title}</p>
              {overview.length < 350 && 
							<p>{overview}</p>
							}
              <Button
                variant="contained"
                color="primary"
                // className={button}
                startIcon={<More />}
              >
                <Link href={`/movie/${id}`}>Details</Link>
             </Button>
              <Button
                variant="contained"
                color="primary"
                // className={button}
                startIcon={<SaveIcon />}
								onClick = {() => addToUser({id})}
								id = {id}
              >
                Add To List
             </Button>
            </div>
          ))}
        </div>
      ) }
      
    </div>
  )
}