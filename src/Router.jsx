import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import GuestLayout from "./components/layouts/GuestLayout";
import EditUser from "./components/user/EditUser";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import Posts from "./components/Posts/Posts";
import Counter  from "./counter";
import Settings from "./components/settings/Settings";
import ChangeUserNameAndEmail from "./components/settings/ChangeUserNameAndEmail";
import ChangePassword from "./components/settings/ChangePassword";
import UsersSearchPage from "./components/search/UsersSearchPage";
import SearchPage from "./components/search/SearchPage";
import PostsSearchPage from "./components/search/PostsSearchPage";
import ForgetPassword from "./components/auth/forgetPassword/ForgetPassword";
import ForgetPasswordOTP from "./components/auth/forgetPassword/ForgetPasswordOTP";
import SetNewPassword from "./components/auth/forgetPassword/SetNewPassword";
import DeleteUser from "./components/settings/DeleteUser";
import ShowPost from "./components/Notifications/ShowPost";
import UserPosts from "./components/user/UserPosts";
import ShowProfilePictures from "./components/user/ٍShowProfilePictures";

let router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: 'user/edit/:id',
                element: <EditUser/>
            },{
                path: 'user/profile/:id/',
                element: <Profile/>,
                children: [
                    {
                        path: 'posts',
                        element: <UserPosts/>,
                    },
                    {
                        path: 'profile-pictures',
                        element: <ShowProfilePictures/>,
                    }
                ]
            },
            {
                path: '',
                element:<Posts/>
            }, 
            {
                path: 'post/:post_id/comment/:comment_id',
                element:<ShowPost/>
            }, 
            {
                path: 'settings',
                element:<Settings/>,
            },
            {
                path: 'settings/change user name & email',
                element:<ChangeUserNameAndEmail/>
            },
            {
                path: 'settings/change password',
                element:<ChangePassword/>
            },
            {
                path: 'settings/delete user',
                element:<DeleteUser/>
            },
            {
                path: 'search/',
                 element:<SearchPage/>,
                 children: [
                    {
                        path: 'users/:search',
                        element:<UsersSearchPage/>
                    }, 
                    {
                        path: 'posts/:search',
                        element:<PostsSearchPage/>
                    },
                 ]
            },
            {
                path: 'counter',
                 element:<Counter/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: 'register',
                element: <Register/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'forgetpassword',
                element: <ForgetPassword/>
            },
            {
                path: 'forgetPasswordOTP/:email',
                element: <ForgetPasswordOTP/>
            },
            {
                path: 'setNewPassword/:id',
                element: <SetNewPassword/>
            },
        ]
    },
   
])

export default router