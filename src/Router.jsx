import { createBrowserRouter } from "react-router-dom";
import EditUser from "./components/user/EditUser";
import Profile from "./components/user/Profile";
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
import Test from "./Test";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage.jsx";

let router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    }, {
        path: '/register',
        element: <RegisterPage />
    }, {
        path: '/',
        element: <HomePage />
    }/*{
        path: '/home',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/user/edit/:id',
                element: <EditUser/>
            },{
                path: '/user/profile/:id/',
                element: <Profile/>,
                children: [
                    {
                        path: '/posts',
                        element: <UserPosts/>,
                    },
                    {
                        path: '/profile-pictures',
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
                 element:<Test/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
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
    },*/

])

export default router