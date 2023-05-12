import './App.css';
import React,{ useEffect, useState} from 'react';
import Post from './Post';

const BASE_URL = 'http://localhost:8000/'


function App()
{
  // useState return 2 array vairables which stores posts and setPosts resp.
  const [posts, setPosts] = useState([]) //setPosts is the function which creates posts.

  // similar to set state - keeps on running again and again
  // ONLY USED HERE TO FETCH DATA and display it on page request 
  useEffect(() => {
    fetch(BASE_URL + 'post/all')
    .then(response => {
      const json = response.json()
      console.log(json);
      if (response.ok)
      {
        return json
      }
      throw response
    })
    .then(data => {
      return data.reverse()
    })
    .then(data =>{
      setPosts(data)
    })
    .catch(error => {
      console.log(error);
      alert(error)
    })
    
  }, []) // [] is used to store dependencies(set state variables that u wanna change, count etc)
 return (
    <div className="App">
      <div className='blog_title'> My Music Blog</div>
      <div className = 'app_posts'>
        {
          posts.map(post => (
            <Post post = {post} />
          ))
        }
      </div>

    </div>
  );
}

export default App;
