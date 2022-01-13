
import React, { useMemo, useRef, useState } from 'react';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
import styles from './styles/App.css';

function App() {
const [posts, setPosts] = useState([
  {id: 1, title: 'Javascript', body: 'Description'},
  {id: 2, title: 'Javascript 2', body: 'Description'},
  {id: 3, title: 'Javascript 3', body: 'Description'},
])
const [selectedSort, setSelectedSort] = useState('');
const [searchQuery, setSearchQuery] = useState('');

function getSortedPosts() {
  console.log("функция отработала")
  if(selectedSort) {
    return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]));
  }
  return posts;
}

const sortedPosts = useMemo()

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
// получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  }

  return (
    <div className='App'>
    <PostForm create={createPost} />
    <hr style={{margin: '15px 0'}}/>
    <div>
    <MyInput 
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      placeholder="Поиск..."
    />
      <MySelect 
        value={selectedSort}
        onChange={sortPosts}
        defaultValue="Сортировка"
        options={[
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По описанию'}
        ]}
      />
    </div>
    {posts.length
    ? <PostList remove={removePost} posts={sortedPosts} title='Посты про JS' />
    : <h1 style={{textAlign: "center"}}>
    Посты не были найдены
    </h1> 
    }
    </div>
  );
}

export default App;
