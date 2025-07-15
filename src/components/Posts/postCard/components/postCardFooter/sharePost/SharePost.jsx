import PropTypes from 'prop-types'
import { useState } from 'react'
import SharePostModal from './SharePostModal'
import SharePostButton from './SharePostButton'

export default function SharePost({ post }) {
    const [show, setShow] = useState(false)

    return (
        <div>
            <SharePostButton {...{setShow}}/>
            <SharePostModal  {...{post, show, setShow}}/>
        </div>
    )
}

SharePost.propTypes = {
	post: PropTypes.object
}