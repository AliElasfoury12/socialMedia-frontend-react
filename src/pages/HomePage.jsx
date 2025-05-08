import DefaultLayout from "../components/layouts/DefaultLayout";
import CreatePostModal from "../components/Posts/components/createPost/CreatePostModal";
import ShowPosts from "../components/Posts/components/ShowPosts";
import { useState } from "react";

export default function HomePage() {
    const [showCreatePostModal, setShowCreatePostModal] = useState(false)

    return (
        <DefaultLayout>
            <button 
                className='bg-blue-600 h-12 mt-7 mb-3 text-white rounded-lg w-[30rem]'
                onClick={() => {setShowCreatePostModal(true)}}>
                What is in your mind?
            </button>
            <CreatePostModal show={showCreatePostModal} setShow={setShowCreatePostModal}/>
            <ShowPosts/>
        </DefaultLayout>
    )
}
