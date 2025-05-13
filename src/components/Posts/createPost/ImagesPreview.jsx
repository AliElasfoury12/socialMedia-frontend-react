import { Trash } from 'lucide-react'
import PropTypes from 'prop-types'
import { postsStorage } from '../../../stores/statices';

export default function ImagesPreview({images, setImages, setToDeletedImages}) 
{
    function deleteImg (index) 
    {        
        let image = images[index]
        if(image.img) setToDeletedImages(I => [...I, image])
        const newImages = images.filter((_, i) => i != index)        
        setImages(newImages)
    }
    
    const imagesPreview = images.map((image, index) => {        
        return ( 
            <div 
                className='relative'
                key={index}>
                <img  className="w-24 h-20" src={ image.img ? postsStorage + image.img : URL.createObjectURL(image) }  />
                <Trash
                    onClick={() => deleteImg(index)} 
                    className='w-5 text-red-600 absolute top-1 right-1'/>
            </div>
        )
    })

    return (
        <div 
            className="grid grid-cols-4 gap-2 self-start mx-2 overflow-scroll"> 
            {imagesPreview}
        </div>
    )
}

ImagesPreview.propTypes = {
    images: PropTypes.array,
    setImages: PropTypes.func,
    setToDeletedImages: PropTypes.func
}
