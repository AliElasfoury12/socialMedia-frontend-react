import { createBrowserRouter } from "react-router-dom";
import UserPosts from "./components/user/UserPosts";
import ShowProfilePictures from "./components/user/ٍShowProfilePictures";
import Test from "./components/Test";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import FindUser from "./pages/auth/FindUser.jsx";
import ForgetPasswordEnterOTP from "./pages/auth/ForgetPasswordEnterOTP.jsx";

import EditUser from "./components/user/EditUser";
import Profile from "./components/user/Profile";
import Settings from "./components/settings/Settings";
import ChangeUserNameAndEmail from "./components/settings/ChangeUserNameAndEmail";
import ChangePassword from "./components/settings/ChangePassword";
import UsersSearchPage from "./components/search/UsersSearchPage";
import SearchPage from "./components/search/SearchPage";
import PostsSearchPage from "./components/search/PostsSearchPage";
import SetNewPassword from "./components/auth/forgetPassword/SetNewPassword";
import DeleteUser from "./components/settings/DeleteUser";
import ShowPost from "./components/Notifications/ShowPost";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },{
        path: '/register',
        element: <RegisterPage />
    },{
        path: 'find_user',
        element: <FindUser/>
    },{
        path: 'forgetPasswordOTP/:email',
        element: <ForgetPasswordEnterOTP/>
    },{
        path: 'setNewPassword/:email',
        element: <SetNewPassword/>
    },{
        path: '/',
        element: <HomePage />
    },{
        path: '/user/profile/:userId/',
        element: <ProfilePage />,
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
    },{
        path: '/test',
        element: <Test /> 
    },{
        path: '*',
        element: <NotFound/> 
    }
    
    
    /*{
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
                path: 'setNewPassword/:id',
                element: <SetNewPassword/>
            },
        ]
    },*/

])

export default router