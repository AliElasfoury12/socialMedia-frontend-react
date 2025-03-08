import { useContext, useState } from 'react'
import CommentsCard from './CommentsCard'
import { CommentContext } from '../CommentsButton'
import Get from '../../API/Get'
import useInfinteScroll from '../../../useInfinteScroll'
import ShowLoop from '../../../ShowLoop'

export default function CommentsShow() {
    let { post, comments, setComments, commentsCount, page, setPage, lastPage, setLastPage, end, setEnd } = useContext(CommentContext) 
    let [loading, setLoading] = useState(false)

    let getComments = () => {
        Get('comments/'+ post.id +'?page=' + page)
        .then((data)=> {
            if(data == '') {
                setLoading(false)
                setEnd(true)
            }else{
                setComments([...comments, ...data])
                setLoading(false)
                setLastPage(page)
            }
        })
    }

    let handleGetComments = () => {
        if(commentsCount && !end && page > lastPage) {
            setLoading(true)
            getComments()
        }
    }

   useInfinteScroll(page, setPage, handleGetComments, 'comments','!dispatch')
  
  return (
    <div id='comments'
        className='max-h-60 overflow-auto mt-3 min-h-3 px-2'
        style={{width: '26.8rem'}} > 
         <ShowLoop loading={loading} array={comments} LoopComponent={CommentsCard} message={'No Comments Yet.'}/>
    </div>
  )
}