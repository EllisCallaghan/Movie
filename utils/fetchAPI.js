import axios from 'axios';

export const fetchPop = async(page) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f5835059f3718386da352228e1486cb3&language=en-US&page=${page}`);
    const data = res.data

    const tenMovies = [];
    for(let i =0; i<10;i++){
      tenMovies.push(data.results[i])
    }

    return data.results
    
};

export const fetchRel = async(movie_id) => {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=f5835059f3718386da352228e1486cb3&language=en-US&page=1`)

  return res.data.results
}

export const fetchDetails = async(movie_id) => {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=f5835059f3718386da352228e1486cb3&language=en-US`)

  return res.data
}

export const fetchVideo = async(movie_id) => {

  const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=f5835059f3718386da352228e1486cb3&language=en-US`)
  const keysArray = [];
  const keysFirst = [];
  res.data.results.map((item) => {
      keysArray.push(item.key)  
      return keysArray
  })
  var keys = Array.from(keysArray)[0];
  keysFirst.push(keys)

  function myFilter(elm){
    return (elm != null && elm !== false && elm !== "" && elm.length != 0);
}
  var filtered = keysFirst.filter(myFilter)

  return keysArray
}