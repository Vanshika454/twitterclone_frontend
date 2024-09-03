import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Sidebar from '../../components/Sidebar'
import Tweet from '../../components/Tweet'
import Profile from '../../components/Profile'

import getAllTweets from '../../services/tweet/getAllTweets'
import getUserData from '../../services/user/getUserData'

export default function Index() {

  const { id } = useParams();
  const navigate = useNavigate();
  
  const [tweets, setTweets] = React.useState([]);
  const [user, setUser] = React.useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllTweets();

        setTweets(data);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserData(id);

        setUser(data);
      } catch (error) {
        toast.error(error.message);
        navigate('/404');
      }
    })();
  }, [id, navigate]);

  const handleOnRply = (tweet) => {
    setTweets([tweet, ...tweets]);
  }

  return (
    <div className='mx-auto shadow d-flex' style={{ backgroundColor: 'white', width: '60%', height: '100vh' }}>
      <Sidebar />
      <div className='d-flex flex-column overflow-scroll hide-scrollbar' style={{ height: '100vh', width: '45vw' }} >
        <Profile user={user} />
        <p className='fs-5 fw-semibold m-2 text-center'>Tweets and Replies</p>
        <div className='flex-fill p-4 pt-0' >
          {
            tweets?.filter(tweet => tweet.tweetedBy._id === id)?.map((tweet, i) => {
              return <Tweet key={i} tweet={tweet} onReply={handleOnRply} />
            })
          }
        </div>
      </div>
    </div>
  )
}
