import React, {useState, useEffect} from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default function PostList(){
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        try {
          const res = await axios.get('http://localhost:4002/posts');
          setPosts(res.data);
        } catch (error) {
          setPosts([]);
        }
      };

    useEffect(()=>{
        fetchPosts();

    }, []); //empty array tells react that this function runs one in while
    console.log(posts);

    const renderPosts = Object.values(posts).map((post) => {
        return <div className="card"
        style={{width: '30%', marginBottom: '20px'}}
        key={post.id}
        >
            <div className="card-body">
                <h3>{post.title}</h3>
                {/* <CommentList postId={post.id}/> */}
                <CommentList comments={post.comments}/>
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
