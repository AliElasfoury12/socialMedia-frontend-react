import { Link } from "react-router-dom"
import DefaultLayout from "../../components/layouts/DefaultLayout"

export default function Settings() {
    const LinkClassName = 'bg-blue-500 py-4 w-96 flex justify-center rounded-lg mb-1'

    return (
        <DefaultLayout>
            <div 
                className="flex flex-col items-center justify-center gap-3 h-[70lvh]">
                <Link
                    to={'/settings/change user name & email'}
                    className={LinkClassName}>
                    Change User Name and Email
                </Link>

                <Link  
                    to={'/settings/change password'}
                    className={LinkClassName}>
                    Change Password
                </Link>  

                <Link 
                    to={'/settings/delete user'}
                    className={LinkClassName}>
                    Delete User
                </Link> 
            </div>
        </DefaultLayout>
    )
}