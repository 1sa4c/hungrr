import React, {useState, useEffect} from 'react';
import './App.css'
import Recipe from './Recipe'

function App() {
  const APP_ID = process.env.REACT_APP_ID
  const APP_KEY = process.env.REACT_APP_KEY


  const [recipes, setRecipes] = useState([])
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [initialRecipe, setInitialRecipe] = useState(0)
  const [hasMore, setHasMore] = useState(false)


  useEffect(() => {
    setLoading(true)
    setHasMore(false)
    fetchData()
  }, [query, initialRecipe])


  useEffect(() => {
    setHasMore(recipes.length > 0 && recipes.length < total ? true : false)
  }, [recipes, error])


  async function fetchData(){
    try{
      setError(false)
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${initialRecipe}&to=${initialRecipe+10}`)
      const data = await response.json()
      setTotal(data.count)
      setRecipes([...recipes, ...data.hits])
    }catch(error){
      setError(true)
    }
    setLoading(false)
  }


  function handleLoading(){
    if(initialRecipe >= 90){
      setHasMore(false)
    }else{
      setInitialRecipe(initialRecipe + 10)
    }
  }


  function handleQuery(e){
    e.preventDefault()
    setRecipes([])
    setQuery(search)
    setInitialRecipe(0)
  }

  function handleSearch(e){
    setSearch(e.target.value)
  }


  return (
    <div className='App'>
      <h1 className='main-title'>Hungrr!</h1>
      <form onSubmit={handleQuery} className='form-search'>
        <input className='input-search' type='text' value={search} onChange={handleSearch}/>
        <button className='button-search' type='submit'>Search</button>
      </form>

      <div className='recipes-container'>
        {recipes.map((item, index) => (
          <Recipe info={item.recipe} key={index}/>
        ))}
      </div>
      
      <div className='info'>
        {loading && <h1 className='loading'>Loading...</h1>}
        {hasMore && <button className='loading-button' onClick={handleLoading}>Load more</button>}
        {error && <h1 className='loading'>You have reached the limit of recipes. Try again later.</h1>}
      </div>
    </div>
  );
}

export default App;
