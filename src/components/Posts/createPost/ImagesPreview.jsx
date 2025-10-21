import { Trash } from 'lucide-react'
import PropTypes from 'prop-types'
import { postsStorage } from '../../../main';

export default function ImagesPreview({images, setImages, setForm}) 
{
    function deleteImg (index) { 
        const image = images[index]
        if(image.img) setForm(prev => ({...prev, to_delete_images: [...prev.to_delete_images, image]}))

        let newImages = images.filter((_,i) => i != index)        
        setImages(newImages)
        newImages = newImages.filter((image) => image.img == undefined )
        setForm(prev => ({...prev, images: newImages}))
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
            className="grid grid-cols-4 gap-2 self-start mx-2 overflow-scroll max-h-40"> 
            {imagesPreview}
        </div>
    )
}

ImagesPreview.propTypes = {
    images: PropTypes.array,
    setImages: PropTypes.func,
    setForm: PropTypes.func,
    setToDeletedImages: PropTypes.func
}
