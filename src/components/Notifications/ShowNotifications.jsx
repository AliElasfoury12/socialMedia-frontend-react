import NotificationCard from "./NotificationCard"
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications, markAllAsRead, setLoading, setPage } from '../../stores/NotificationsStore'
import useInfinteScroll from "../../useInfinteScroll"
import ShowLoop from "../../components/Common/ShowLoop"

export default function ShowNotifications() {
    let dispatch = useDispatch()
    let {notifications, loading, end, page, lastPage}  = useSelector(state => state.notifications)

    let handleMarkAllAsRead = () => {
        let exists = notifications.find((n) => n.read_at == null)
            if(exists) {
                dispatch(markAllAsRead())
            }
    }

    let handleGetNotifications = () => {
        if (!end  && page > lastPage) {
            dispatch(setLoading(true))
            dispatch(getNotifications(page))
        }    
    }

    useInfinteScroll(page, setPage, handleGetNotifications, 'notifications')

    return (        
            <div 
                id='notifications'
                className="absolute flex flex-col bg-white top-11 -left-40 w-96 h-96 overflow-y-scroll">
                <button 
                    onClick={handleMarkAllAsRead}
                    className='my-2 bg-blue-400 rounded-lg p-2 self-end mr-2'>
                    Mark All As Read
                </button>
               <ShowLoop loading={loading} array={notifications} LoopComponent={NotificationCard}/>
            </div>
    )
}