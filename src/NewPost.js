import React, {useState} from 'react';
import './NewPost.css'

const BASE_URL = 'http://localhost:8000/'

function NewPost(){
    
    const [image, setImage] = useState(null)
    const [creator, setCreator] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    // const [Image_url, setImage_url] = useState('')
    const handleImageUpload = (e) => {
        if (e.target.files[0])
        {
            setImage(e.target.files[0])
        }

    }

    const handleCreate = (e) => {
        e?.preventDefault()
        // stops the default functionality of button

        const formData = new FormData()
        formData.append('image',image)

        const requestOptions = {
            method : 'POST',
            body : formData
        }

        fetch(BASE_URL + 'post/image', requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(data => {
            createPost(BASE_URL + data.filename)
        })
        .catch(error => {
            console.log(error);
        })
        .finally(()=> {
            setImage(null)
            document.getElementById('fileInput').value = null
        })
    }

    const createPost = (imageurl) => {
        const json_string = JSON.stringify({
            'image_url' : imageurl,
            'title' : title,
            'content' : content,
            'creator' : 'by ' + creator
        })

        const requestOptions = {
            method : 'POST',
            headers: new Headers({
                'Content-Type' : 'application/json'
            }),
            body : json_string
        }

        fetch(BASE_URL + 'post', requestOptions)
        .then(response => {
            if (response.ok)
            {
                return response.json()
            }
            throw response
        })
        .then( data => {
            // auto reloads webpage when a new post is created. n need of manual reload
            window.location.reload() 
            window.scrollTo(0,0)
        })
        .catch(error => {
            console.log(error);
        })

    }

    return (
        <div className='newpost_content'>
            <div className='newpost_image'>
                <input type = "file" id = "fileInput" onChange={handleImageUpload} />
            </div>
            {/* <div className='newpost_imgurl'>
                <input className='newpost_imgurl' type="text" id="image_url" 
                placeholder='Image_url' onChange={(event) => setImage_url(event.target.value)} value={Image_url}/>
            </div> */}
            <div className='newpost_creator'>
                <input className='newpost_creator' type="text" id="creator_input" 
                placeholder='Creator' onChange={(event) => setCreator(event.target.value )} value={creator}/>

            </div>
            <div className='newpost_title'>
                <input className='newpost_title' type="text" id="title_input" 
                placeholder='Title' onChange={(event) => setTitle(event.target.value)} value={title}/>

            </div>
            <div className='newpost_content'>
                <textarea className='newpost_content' rows='10' id="content_input" 
                placeholder='Content' onChange={(event) => setContent(event.target.value)} value={content}/>

            </div>
            <div>
                <button className='create_button' onClick={handleCreate}>Create new post!</button>
            </div>

        </div>
    )

}

export default NewPost