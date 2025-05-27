import Modal from '../../../Modal'
import PropTypes from 'prop-types'
import { postsStorage } from '../../../../stores/statices'

export default function Gallery ({images, show, setShow}) {

    const showImages = images.map((image,index) => {
        return (
            <img 
                loading="lazy"
                key={index}
                className="mb-4 w-[40rem]" 
                src={postsStorage + image.img} />
        )
    })

    
    return (
        <Modal show={show} setShow={setShow}>
            <div
                className=" flex flex-col rounded-xl w-[40rem]
                my-3 py-1 px-2 min-w-80 m-auto gap-2 overflow-y-scroll">
                {showImages}
            </div>
        </Modal>
    )
}

Gallery.propTypes = {
    images: PropTypes.array,
    show: PropTypes.bool,
    setShow: PropTypes.func,
}