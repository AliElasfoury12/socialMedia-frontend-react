import PropTypes from 'prop-types'
import Modal from '../../../../../Modals/Modal'
import SharePostForm from './SharePostForm'
import SharedPostPreivew from './SharedPostPreivew'

export default function SharePostModal ({post, show, setShow}) {
    return (
        <Modal show={show} setShow={setShow} >
            <div 
                className='flex flex-col p-2 items-center w-[28rem]'>

                <SharePostForm {...{post, show, setShow}}/>
                <SharedPostPreivew {...{post}}/>
            </div>
        </Modal>
    )
}

SharePostModal.propTypes = {
    post: PropTypes.object,
    show: PropTypes.bool,
    setShow: PropTypes.func
}