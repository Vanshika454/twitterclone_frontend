import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

import Modal from './Modal'
import createATweet from '../services/tweet/createATweet';

export default function CreateTweet({ onClose, onSuccess }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(content.trim().length === 0) {
      setError('Content is required!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', content);
      if(image) {
        formData.append('image', image);
      }

      const { tweet } = await createATweet(formData);
      toast.success('Tweet Created Successfully!');

      onSuccess && onSuccess(tweet);
      onClose && onClose();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Modal>
      <p className='border-bottom fw-bold fs-5 m-0 p-3' >New Tweet</p>

      <form
        onSubmit={handleSubmit}
      >
        <textarea 
          className='form-control my-4' 
          rows='3' 
          placeholder='What is happening?'
          style={{ width: '96%', margin: 'auto' }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {
          image ? <img 
            src={URL.createObjectURL(image)}
            alt="UploadedImage" 
            style={{ width: '98%', height: 'auto', margin: '1%'}}
            className='mb-3'
            /> : <div className='position-relative mx-3 mb-3' style={{ height: '1.25rem', width: '1.25rem' }}>
            <input 
              type="file" 
              alt='Upload Image'
              style={{ height: '100%', width: '100%', zIndex: 20, opacity: 0}}
              onChange={(e) => {
                if(e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}

              className='top-0 start-0 position-absolute'
              src='https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png'  
            />
            <FontAwesomeIcon 
              icon={faImage} 
              color='black'
              style={{ height: '100%', width: '100%', zIndex: 10 }}
              className='position-absolute top-0 start-0'
            />
          </div>
        }
          
          {
            error && <p className='text-danger px-3'>{error}</p>
          }
        <div className='d-flex justify-content-end align-items-center border-top p-2 gap-3'>
          <button type="button" onClick={() => onClose && onClose()} className="btn btn-secondary">Cancel</button>
          <button type='submit' className='btn btn-primary'>Tweet</button>
        </div>
      </form>
    </Modal>
  )
}
