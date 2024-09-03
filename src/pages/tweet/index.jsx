import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import getATweet from '../../services/tweet/getATweet';

import Tweet from '../../components/Tweet';

export default function Index() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [tweet, setTweet] = useState();
  const [replys, setReplys] = useState([]);

  useEffect(() => {
    if(!tweet) return;
    setReplys(tweet.replies);
  }, [tweet])

  useEffect(() => {
    (async () => {
      try {
        const data = await getATweet(id);
        console.log(data);
        setTweet(data);
      } catch (error) {
        navigate('/404');
      }
    })()
  }, [id, navigate]);

  const handleRply = (tweet) => {
    setReplys([tweet, ...replys]);
  }

  return (
    <>
      <div className='mx-auto shadow d-flex' style={{ backgroundColor: 'white', width: '60vw', height: '100vh' }}>
        <Sidebar />

        <div className='d-flex flex-column' style={{ height: '100vh', width: '45vw' }} >
          <div className='d-flex justify-content-between align-items-center p-4'>
            <p className='fs-5 fw-semibold m-0'>Tweet</p>
          </div>

          <div className='flex-fill p-4 pt-0 overflow-scroll hide-scrollbar' >
            {tweet && <Tweet tweet={tweet} border={false} onReply={handleRply} />}

            <p className='fw-semibold' >Replies</p>
            {
              tweet && replys?.map((tweet, i) => {
                return <Tweet key={i} tweet={tweet} />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}
