import { Bell } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ShowNotifications from "./ShowNotifications"
import { seen, setNotifications, setNotificationsCount, setShow, getNotifications } from "../../stores/NotificationsStore"

export default function Notification() {
    let dispatch = useDispatch()
    let { authUser }  = useSelector(state => state.auth)
    let { show, notificationsCount}  = useSelector(state => state.notifications)
    
    useEffect(() => {
        dispatch(getNotifications(1))

        window.Echo.private(`notifications.${authUser.id}`)
        .notification((data) => {
            console.log(data);
            dispatch(setNotifications(data))
            dispatch(setNotificationsCount())
        })
    },[])
  
    return (
        <div 
            className="relative mt-1">
            {notificationsCount && !show ?
                <p 
                    className="absolute -top-2 left-4 bg-red-600 rounded-full text-xs "
                    style={{padding: '2px 6px'}}>
                    {notificationsCount}
                </p>
            : ''}

            <Bell 
                  onClick={() => {
                   dispatch(setShow(!show))
                    if(notificationsCount){
                        dispatch(seen())
                    }
                }}
                className="h-7 w-7"/>

                { show && 
                    <ShowNotifications />
                }
        </div>
    )
}
