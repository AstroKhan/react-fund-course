
import React, { useRef, useState } from 'react';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import styles from './styles/App.css';

function App() {
const [posts, setPosts] = useState([
  {id: 1, title: 'Javascript', body: 'Description'},
  {id: 2, title: 'Javascript 2', body: 'Description'},
  {id: 3, title: 'Javascript 3', body: 'Description'},
])


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
// получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className='App'>
    <PostForm create={createPost} />
    {posts.length
    ? <PostList remove={removePost} posts={posts} title='Посты про JS' />
    : <h1 style={{textAlign: "center"}}>
    Посты не были найдены
    </h1> 
    }
    </div>
  );
}

export default App;
