import React from "react";
// import axios from "axios";

const CommentList = ({comments})=>{
    // const [comments, setComments] = useState([]);

    // const fetchData = async () =>{
    //     const res = await axios.get(`https://jubilant-umbrella-v7w79q9w9q3jp9-4001.app.github.dev/posts/${postId}/comments`).catch((err)=>{
    //         console.log(err.message);
    //     });
    

    //     setComments(res.data);
    // }
    
    // useEffect(() => {
    //   fetchData();
    // },[]);

    const renderedComments = comments.map(comment =>{
        let content;

        if(comment.status === 'approved'){
            content = comment.content;
        }

        if(comment.status === 'pending'){
            content = 'This comment is awaiting moderation'
        }

        if(comment.status === 'rejected'){
            content = 'This comment has been rejected'
        }




        return <li key={comment.id}>{content}
        </li>
    })

    return (<ul>
        {renderedComments}
    </ul>)
}

export default CommentList;