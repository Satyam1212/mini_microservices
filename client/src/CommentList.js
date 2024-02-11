import React, { useState, useEffect} from "react";
import axios from "axios";

const CommentList = ({postId})=>{
    const [comments, setComments] = useState([]);

    const fetchData = async () =>{
        const res = await axios.get(`https://jubilant-umbrella-v7w79q9w9q3jp9-4001.app.github.dev/posts/${postId}/comments`).catch((err)=>{
            console.log(err.message);
        });
    

        setComments(res.data);
    }
    
    useEffect(() => {
      fetchData();
    },[]);

    const renderedComments = comments.map(comment =>{
        return <li key={comment.id}>{comment.content}</li>
    })

    return (<ul>
        {renderedComments}
    </ul>)
}

export default CommentList;