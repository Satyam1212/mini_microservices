import React, { useState } from "react";
import axios from 'axios';

const PostCreate = () =>{
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        // to prevent default action that occurs whenever a user submits a form in a browser
        //by default browser is going to try to submit that form itself
        event.preventDefault();

        await axios.post('http://localhost:4000/posts', { title })
    

        //after creating post we want to blank out title 
        setTitle('');
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="from-contro"/>
                </div>
                <button className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )

}
export default PostCreate;