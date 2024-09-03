import React, { useState } from 'react'
import { toast } from 'react-toastify';

import Modal from './Modal'
import commentOnATweet from '../services/tweet/commentOnATweet'

export default function CreateComment({ tweetId, onClose, onSuccess }) {

  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if(content.trim().length === 0) {
        setError('Content is required!');
      }

      const { tweet } = await commentOnATweet(tweetId, content);
      toast.success('Comment Created Successfully!');

      onSuccess && onSuccess(tweet);
      onClose && onClose();
    } catch (error) { 
      toast.error(error.message);
    }
  }

  return (
    <Modal>
      <p className='border-bottom fw-bold fs-5 m-0 p-3' >Tweet your reply</p>

      <form
        onSubmit={handleSubmit}
      >
        <textarea 
          className='form-control my-4' 
          rows='3' 
          placeholder='Reply to this tweet...'
          style={{ width: '96%', margin: 'auto' }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
          
        {
          error && <p className='text-danger px-3'>{error}</p>
        }
        <div className='d-flex justify-content-end align-items-center border-top p-2 gap-3'>
          <button type="button" onClick={() => onClose && onClose()} className="btn btn-secondary">Cancel</button>
          <button type='submit' className='btn btn-primary'>Reply</button>
        </div>
      </form>
    </Modal>
  )
}
