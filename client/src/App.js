//It is App component
import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';


//Here we add bootstrap via CDN just copy link script and paste in index.html head

const App = () => {
    return <div className='container'>
        <h1>Create Post</h1>
        <PostCreate/>
        <hr/>
        <h1>Posts</h1>
        <PostList/>
    </div>
}

export default App;