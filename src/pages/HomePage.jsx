import DefaultLayout from "../components/layouts/DefaultLayout";
import CreatePost from "../components/Posts/components/createPost/CreatePost";
import ShowPosts from "../components/Posts/components/ShowPosts";

export default function HomePage() {
    return (
        <DefaultLayout>
            <CreatePost/>
            <ShowPosts/>
        </DefaultLayout>
    )
}
