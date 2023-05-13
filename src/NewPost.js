import React, {useState} from 'react';
import './NewPost.css'

const BASE_URL = 'http://localhost:8000/'

function NewPost(){
    
    const [image, setImage] = useState(null)
    const [creator, setCreator] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [Image_url, setImage_url] = useState('')
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
    }

    return (
        <div className='newpost_content'>
            <div className='newpost_image'>
                <input type = "file" id = "fileInput" onChange={handleImageUpload} />
            </div>
            <div className='newpost_imgurl'>
                <input className='newpost_imgurl' type="text" id="image_url" 
                placeholder='Image_url' onChange={(event) => setImage_url(event.target.value)} value={Image_url}/>
            </div>
            <div className='newpost_creator'>
                <input className='newpost_creator' type="text" id="creator_input" 
                placeholder='Creator' onChange={(event) => setCreator(event.target.value)} value={creator}/>

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