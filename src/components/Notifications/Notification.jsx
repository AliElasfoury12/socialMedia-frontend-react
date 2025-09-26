import { Bell } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ShowNotifications from "./ShowNotifications"
import { seen, setNotifications, setNotificationsCount, setShow, getNotificationscount } from "../../stores/NotificationsStore"
import ShowIf from '../Common/ShowIf'
export default function Notification() {
    const dispatch = useDispatch()
    const { authUser }  = useSelector(state => state.auth)
    const { show, notificationsCount}  = useSelector(state => state.notifications)
    
    useEffect(() => {
        if (notificationsCount === null) dispatch(getNotificationscount()) 
            
        window.Echo.private(`notifications.${authUser.id}`)
        .notification((data) => {
            console.log(data);
            
            dispatch(setNotifications(data))
            dispatch(setNotificationsCount())
        })
    },[])
  
    return (
        <div className="relative mt-1">
            <ShowIf show={notificationsCount > 0 && !show}>
                <p 
                    className="absolute -top-2 left-4 bg-red-600 rounded-full text-xs px-[6px] py-[2px]">
                    {notificationsCount}
                </p>
            </ShowIf>

            <Bell 
                onClick={() => {
                   dispatch(setShow(!show))
                    if(notificationsCount) dispatch(seen())
                }}
                className="h-7 w-7"
            />

            { show && <ShowNotifications />}
        </div>
    )
}
