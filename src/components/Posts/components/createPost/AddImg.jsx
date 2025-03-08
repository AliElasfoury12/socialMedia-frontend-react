import { Trash } from 'lucide-react'
import PropTypes from 'prop-types'

export default function AddImg(props) {
    let { imgs,setImgs } = props

    let deleteImg = (index) => {
        setImgs(Object.values(imgs).filter((_, i) => i != index ))
    }

    let imgsPreview = Object.values(imgs).map((img, index) => {
        return ( 
            <div 
                className='relative'
                key={index}>
                <img  className="w-24 h-20" src={URL.createObjectURL(img)}  />
                <Trash
                    onClick={() => deleteImg(index)} 
                    className='w-5 text-red-600 absolute top-1 right-1'/>
            </div>
        )
    })

    return (
        <div className='self-start ml-1 mt-1'>
            <label 
                htmlFor='img' 
                className=" bg-blue-800 text-white rounded-md p-1
                text-center w-32  hover:cursor-pointer">
                Add Image
            </label>
            <input 
                id="img"
                type="file"
                multiple
                className="mb-10 hidden" 
                onChange={e => setImgs(e.target.files)}/>
            <div 
                className="flex gap-2 self-start mt-4"> 
                {imgsPreview}
            </div>
        </div>
    )
}

AddImg.propTypes = {
    imgs: PropTypes.array,
    setImgs: PropTypes.func
}
