import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import Sidebar from '../../components/Sidebar'
import Tweet from '../../components/Tweet'

import getAllTweets from '../../services/tweet/getAllTweets'
import CreateTweet from '../../components/CreateTweet'

export default function Index() {

  const [tweets, setTweets] = React.useState([]);
  const [isCreatingNewTweet, setIsCreatingNewTweet] = React.useState(false);

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

  const handleOnSuccessTweetCreation = (tweet) => {
    setTweets([tweet, ...tweets]);
  }

  const handleOnRply = (tweet) => {
    setTweets([tweet, ...tweets]);
  }

  return (
    <>
      {isCreatingNewTweet && <CreateTweet onClose={() => setIsCreatingNewTweet(false)} onSuccess={handleOnSuccessTweetCreation} />}
      <div className='mx-auto shadow d-flex' style={{ backgroundColor: 'white', width: '60vw', height: '100vh' }}>
        <Sidebar />

        <div className='d-flex flex-column' style={{ height: '100vh', width: '45vw' }} >
          <div className='d-flex justify-content-between align-items-center p-4'>
            <p className='fs-5 fw-semibold m-0'>Home</p>

            <button type="button" onClick={() => setIsCreatingNewTweet(true)} className="btn btn-primary px-5">Tweet</button>
          </div>

          <div className='flex-fill p-4 pt-0 overflow-scroll hide-scrollbar' >
            {
              tweets.map((tweet, i) => {
                return <Tweet key={i} tweet={tweet} onReply={handleOnRply} />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}
