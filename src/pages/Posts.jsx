

import React, { useState, useEffect, useRef } from "react";
import Pagination from "../components/UI/pagination/Pagination";
import MyModal from '../components/UI/MyModal/MyModal';
import Loader from '../components/UI/Loader/Loader';
import MyButton from '../components/UI/button/MyButton';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';
import { getPageCount } from '../utils/pages';
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
const [posts, setPosts] = useState([])
const [filter, setFilter] = useState({sort: '', query: ''})
const [modal, setModal] = useState(false);
const [totalPages, setTotalPages] = useState(0);
const [limit, setLimit] = useState(10);
const [page, setPage] = useState(1);
const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
const lastElement = useRef();


const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
  const response = await PostService.getAll(limit, page);
  setPosts([...posts, ...response.data]);
  const totalCount = response.headers['x-total-count'];
  setTotalPages(getPageCount(totalCount, limit));
})

useObserver(lastElement, page < totalPages, isPostsLoading, () => {
  setPage(page + 1);
})

useEffect(() => {
  fetchPosts(limit, page)
}, [page, limit])

const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }


// получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className='App'>
    <button onClick={fetchPosts}>GET POST</button>
    <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
      Создать пользователя
    </MyButton>
    <MyModal visible={modal} setVisible={setModal} >
    <PostForm create={createPost} />
    </MyModal>
    <hr style={{margin: '15px 0'}}/>
    <PostFilter 
    filter={filter} 
    setFilter={setFilter} 
    />
    <MySelect
    value={limit}
    onChange={value => setLimit(value)}
    defaultValue="Количество элементов на странице"
    options={[
      {value: 5, name: '5'},
      {value: 10, name: '10'},
      {value: 25, name: '25'},
      {value: -1, name: 'Показать все'},
    ]}
    />
    {postError &&
    <h1>Произошла ошибка ${postError}</h1>
    }
    <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS' />
    <div ref={lastElement} style={{height: 20, background: 'red'}}/>
    {isPostsLoading &&
     <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
    }
    <Pagination 
    page={page} 
    changePage={changePage} 
    totalPages={totalPages}
    />
    </div>
  );
}

export default Posts;

