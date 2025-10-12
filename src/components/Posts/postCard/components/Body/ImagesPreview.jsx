import PropTypes from 'prop-types'
import { postsStorage } from '../../../../../main'

export default function ImagesPreview ({images, setShowImagesGallery}) {
    let GridClassRepeat = 'grid-cols-2'

    function image (imageSrc) {
        return (
            <img 
                loading="lazy"
                onClick={() => {setShowImagesGallery(true)}}
                className="w-auto h-full object-cover rounded-lg" 
                src={postsStorage + imageSrc?.img} /> 
        )
    }

    function Display3Images () {
        return (
            <div className='w-full h-96 px-1 my-1 flex gap-1'>
                <div className='w-1/2 h-full'>
                    {image(images[0])}
                </div>
                <div className='w-1/2 h-full flex flex-col gap-1'>
                    {image(images[1])}
                    {image(images[2])}
                </div>
            </div>
        )
    }

    if(images.length == 3) 
        return Display3Images()
    else if(images.length == 1) 
        GridClassRepeat = 'grid-cols-1'

    const extraCount = images.length - 4 
    images = images.slice(0,4)

    const showImages = images.map((imageSrc, index) => {
        return (
            <div 
                className='w-auto h-full relative'               
                key={imageSrc.id}>
                {image(imageSrc)}
                {extraCount > 0 && index == 3 && <p className='text-2xl absolute top-1/2 left-1/2'>+{extraCount}</p> }
            </div>
        )
    })

    return (
        <div className={`w-full h-80 p-1 gap-1 grid ${GridClassRepeat} overflow-hidden `}>
            {showImages}
        </div>
    )
}

ImagesPreview.propTypes = {
    images: PropTypes.array,
    setShowImagesGallery: PropTypes.func,
}