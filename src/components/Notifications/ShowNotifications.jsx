import NotificationCard from "./NotificationCard"
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications, markAllAsRead} from '../../stores/NotificationsStore'
import useInfinteScroll from "../../useInfinteScroll"
import ShowLoop from "../../components/Common/ShowLoop"

export default function ShowNotifications() {
    const dispatch = useDispatch()
    const {notifications, loading} = useSelector(state => state.notifications)

    function handleMarkAllAsRead () {
        const exists = notifications.find((n) => n.read_at == null)
        if(exists) dispatch(markAllAsRead())
    }

    useInfinteScroll(() => dispatch(getNotifications()), notifications.length === 0 ,'notifications')

    return (        
        <div 
            id='notifications'
            className="absolute flex flex-col bg-white top-11 -left-40 w-96 h-96 overflow-y-scroll">
            <div className="sticky top-0 z-10 bg-white">
                <button 
                    onClick={handleMarkAllAsRead}
                    className='my-2 bg-blue-400 rounded-lg p-2 self-end mr-2 float-right'>
                    Mark All As Read
                </button>
            </div>
            <ShowLoop loading={loading} array={notifications} LoopComponent={NotificationCard}/>
        </div>
    )
}