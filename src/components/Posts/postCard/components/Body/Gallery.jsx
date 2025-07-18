import Modal from '../../../../Modals/Modal'
import PropTypes from 'prop-types'
import { postsStorage } from '../../../../../stores/statices'

export default function Gallery ({images, showImagesGallery, setShowImagesGallery}) {

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
        <Modal show={showImagesGallery} setShow={setShowImagesGallery}>
            <div
                className="flex flex-col rounded-xl w-[40rem]
                my-3 p-1 m-auto gap-2 overflow-y-scroll">
                {showImages}
            </div>
        </Modal>
    )
}

Gallery.propTypes = {
    images: PropTypes.array,
    showImagesGallery: PropTypes.bool,
    setShowImagesGallery: PropTypes.func,
}