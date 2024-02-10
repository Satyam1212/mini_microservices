import React, {useState, useEffect} from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () =>{
    const [posts, setPosts] = useState({});

    const fetchPosts = async() => {
        const res = await axios.get('https://jubilant-umbrella-v7w79q9w9q3jp9-4000.app.github.dev/posts').catch((err)=>{
            console.log(err.message);
        });

        setPosts(res.data);
    }

    useEffect(()=>{
        fetchPosts();

    }, []); //empty array tells react that this function runs one in while
    console.log(posts);

    const renderPosts = Object.values(posts).map(post => {
        return <div className="card"
        style={{width: '30%', marginBottom: '20px'}}
        key={post.id}
        >
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList postId={post.id}/>
                <CommentCreate postId={post.id}/>
            </div>
        </div>
    })

    return(
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderPosts}
        </div>
    );
}

export default PostList;