import { createBrowserRouter } from "react-router-dom";
import UserPosts from "./components/user/UserPosts";
import ShowProfilePictures from "./components/user/ٍShowProfilePictures";
import Test from "./components/test/Test.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import FindUser from "./pages/auth/forgetPassword/FindUser.jsx";
import ForgetPasswordEnterOTP from "./pages/auth/forgetPassword/ForgetPasswordEnterOTP.jsx";
import SetNewPassword from "./pages/auth/forgetPassword/SetNewPassword";
import NotFound from "./pages/NotFound.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Settings from "./pages/settings/Settings.jsx"
import ChangeUserNameAndEmail from "./pages/settings/ChangeUserNameAndEmail.jsx"
import ChangePassword from "./pages/settings/ChangePassword.jsx"
import DeleteUser from "./pages/settings/DeleteUser.jsx"
import ShowNotificationsPost from "./components/Notifications/ShowNotificationsPost.jsx";
import UsersSearchPage from "./components/search/UsersSearchPage";
import SearchPage from "./pages/SearchPage.jsx";
import PostsSearchPage from "./components/search/PostsSearchPage";

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
    }, {
        path: 'settings',
        element:<Settings/>,
    },{
        path: 'settings/change user name & email',
        element:<ChangeUserNameAndEmail/>
    },{
        path: 'settings/change password',
        element:<ChangePassword/>
    },{
        path: 'settings/delete user',
        element:<DeleteUser/>
    },{
        path: 'post/:post_id/comment/:comment_id',
        element:<ShowNotificationsPost/>
    }, {
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
            }
        ]
    },{
        path: '/test',
        element: <Test /> 
    },{
        path: '*',
        element: <NotFound/> 
    }
])

export default router