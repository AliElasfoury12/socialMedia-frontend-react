import { createSlice, current, isFulfilled, isPending } from '@reduxjs/toolkit'
import { createPost, deletePost, deletePostImages, followPostUser, getPosts, SharePost, updatePost } from './posts_thunks'

export const postsSlice = createSlice({
	name: 'posts',

	initialState: {
		posts: [],
		loading: false,
		cursor: '',
	},
  
	reducers: {
		changePostCount: (state, {payload}) => {
			const post = state.posts.find((post) => post.id == payload.postId)
			post.comments_count += payload.amount
		},
        
		setLoading: (state, {payload}) => {
			state.loading = payload
		}
	},

	extraReducers: (builder) => {
		builder.addCase(getPosts.fulfilled, (state, {payload}) => {				
			if(!payload) return

			state.cursor = payload.nextCursor		
			state.posts.push(...payload.posts)
		})
		.addCase(updatePost.fulfilled, (state, {payload}) => {
			if(!payload) return

			const post = state.posts.find((post) => post.id == payload.id)

			if(payload.post.content) post.content = payload.post.content
			if(payload.to_delete_images) {
				console.log(payload.to_delete_images, current(post.post_imgs));
				
				post.post_imgs = post.post_imgs.filter(image => !payload.to_delete_images.some(deletedImage => deletedImage.id == image.id))
			}
			if(payload.post.post_imgs) post.post_imgs.push(...payload.post.post_imgs)
		})
		.addCase(deletePost.fulfilled, (state, {payload}) => {
			if(!payload) return			
			state.posts = state.posts.filter((post) => post.id !== payload)
		})
		.addCase(followPostUser.fulfilled, (state, {payload}) => {	
			console.log(payload);
								
			state.posts = state.posts.map((post) => {
				if(post.user.id == payload.userId) 
					post.user.is_auth_user_follows = payload.follows
				
				if(post.shared_post?.user?.id == payload.userId) 
					post.shared_post.user.is_auth_user_follows = payload.follows
				
				return post
			})			
        })
		.addCase(deletePostImages.fulfilled, (state, {payload}) => {			
			const post = state.posts.find((post) => post.id == payload.postId)	
			post.post_imgs = post.post_imgs.filter(image => !payload.images.some(deletedImage => deletedImage.id == image.id))
        })
		.addMatcher(isFulfilled(createPost, SharePost),(state, {payload}) => {
			state.posts.unshift(payload.post)
		})
		.addMatcher(isPending(createPost, updatePost),(state) => {state.loading = true}
		)
		.addMatcher(isFulfilled(getPosts, updatePost, createPost, SharePost),(state) => {
			state.loading = false
		})
	}
})

export const {changePostCount, setLoading} = postsSlice.actions

export default postsSlice.reducer
