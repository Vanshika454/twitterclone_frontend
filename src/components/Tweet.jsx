import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faRetweet, faUser, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment  } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'react-toastify';

import CreateComment from './CreateComment';

import useAuth from '../hooks/useAuth';
import likeATweet from '../services/tweet/likeATweet';
import dislikeATweet from '../services/tweet/dislikeATweet';
import deleteATweet from '../services/tweet/DeleteATweet';
import retweetATweet from '../services/tweet/retweetATweet';

export default function Tweet({ tweet, onReply, border = true }) {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(tweet?.isDeleted);
  const [replies, setReplies] = useState(tweet?.replies?.length);
  const [isCreatingComment, setIsCreatingComment] = useState(false);

  useEffect(() => {
    tweet?.likes?.forEach(likedBy => {
      if (likedBy._id === user._id) setIsLiked(true);
    });

    tweet?.retweetBy?.forEach(retweetBy => {
      if (retweetBy._id === user._id) setIsRetweeted(true);
    });
  }, [user, tweet?.likes, tweet?.retweetBy]);

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      await likeATweet(tweet._id);

      tweet.likes.push(user);
      toast.success('Tweet liked successfully!');
      setIsLiked(true);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleDislike = async (e) => {
    e.stopPropagation();
    try {
      await dislikeATweet(tweet._id);

      tweet.likes = tweet?.likes?.filter(likedBy => likedBy._id !== user._id);
      toast.success('Tweet disliked successfully!');
      setIsLiked(false);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteATweet(tweet._id);

      toast.success('Tweet deleted successfully!');
      tweet.isDeleted = true;
      setIsDeleted(true);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleRetweet = async (e) => {
    e.stopPropagation();
    try {
      await retweetATweet(tweet._id);

      tweet.retweetBy.push(user);
      toast.success('Tweet retweeted successfully!');
      setIsRetweeted(true);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleComment = (e) => {
    e.stopPropagation();
    setIsCreatingComment(true);
  }

  const handleCommentSuccess = (tweet) => {
    setReplies(replies + 1);
    onReply && onReply(tweet);
  }

  if(isDeleted) return null;
  return (
    <>
      {isCreatingComment && <CreateComment onClose={() => setIsCreatingComment(false)} tweetId={tweet._id} onSuccess={handleCommentSuccess} />}
      <div className={`w-100 ${border && 'border'} rounded mb-3 p-2 hover-hand`}
        onClick={() => navigate(`/tweet/${tweet?._id}`)}
      >
        {
          [...tweet?.retweetBy?.filter(retweetedBy => retweetedBy._id !== user._id), isRetweeted? user: null].map((retweetBy, i) => {
            if(!retweetBy) return null;
            return <div 
              key={i}
              className='d-flex align-items-center mb-1'
              style={{ marginLeft: `${(i+1)*0.5}rem` }}
            >
              <FontAwesomeIcon
                color='rgba(0,0,0, 0.5)'
                style={{ height: '1rem' }}
                icon={faRetweet} 
                className='hover-hand me-2'
              />
              <p className='m-0 text-black-50'>Retweeted by {retweetBy.userName}</p>
            </div>
          })
        }
        <div className='w-100 d-flex'>
        <div className='me-2' style={{ width: '13%', maxWidth: '3.5rem', minWidth: '3rem' }}>
          <div className='w-full rounded-5 d-flex justify-content-center align-items-center' style={{ backgroundColor: 'rgba(0,0,0, 0.5)', aspectRatio: 1 }}>
            {
              tweet?.tweetedBy?.profilePicture ? <img
                src={process.env.REACT_APP_BACKEND + tweet?.tweetedBy?.profilePicture} 
                alt="Profile" 
                className='rounded-circle' 
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              /> : 
              <FontAwesomeIcon
                color='black'
                style={{ height: '60%' }}
                icon={faUser}
              />
            }
          </div>
        </div>
        <div className='flex-fill'>
          <div className='d-flex justify-content-between align-items-center mb-2'>
            <p className='fw-semibold m-0 hover-hand' onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${tweet?.tweetedBy?._id}`)
              }} 
            >
              @{tweet?.tweetedBy?.userName} 
            <span className='fw-normal ms-2'>{new Date(tweet?.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</span></p>

            {
              tweet?.tweetedBy?._id === user._id && <FontAwesomeIcon
                color='black'
                style={{ height: '1rem' }}
                icon={faTrash}
                onClick={handleDelete}
              />
            }
          </div>

          {/* content */}
          <p className='w-full m-0' style={{ textWrap: 'stable' }}>{tweet?.content}</p>
          {/* Image */}
          {
            tweet?.image && <img 
              src={process.env.REACT_APP_BACKEND + tweet?.image} 
              alt="Post" 
              className='w-100 mt-2'
            />
          }

          {/* Actions */}
          <div className='d-flex mt-3 mb-1 gap-3'>
            <div className='d-flex gap-1 justify-content-center position-relative'>
              <FontAwesomeIcon
                color='red'
                style={{ height: '1rem' }}
                icon={faHeart} 
                className='hover-hand'
                onClick={isLiked ? handleDislike : handleLike}
              />

              {
                isLiked && <FontAwesomeIcon
                  color='red'
                  style={{ height: '1rem' }}
                  icon={solidHeart} 
                  className='hover-hand position-absolute start-0'
                  onClick={isLiked ? handleDislike : handleLike}
                />
              }

              <p className='' style={{ fontSize: '0.8rem' }}>{tweet?.likes?.length}</p>
            </div>

            <div className='d-flex gap-1 justify-content-center'>
              <FontAwesomeIcon
                color='blue'
                style={{ height: '1rem' }}
                icon={faComment} 
                className='hover-hand'
                onClick={handleComment}
              />

              <p className='' style={{ fontSize: '0.8rem' }}>{replies}</p>
            </div>

            <div className='d-flex gap-1 justify-content-center'>
              <FontAwesomeIcon
                color='green'
                style={{ height: '1rem' }}
                icon={faRetweet} 
                className='hover-hand'
                onClick={handleRetweet}
              />

              <p className='' style={{ fontSize: '0.8rem' }}>{tweet?.retweetBy?.length}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
