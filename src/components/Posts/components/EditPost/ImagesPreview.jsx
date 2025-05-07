import { Trash } from "lucide-react";
import propTypes from "prop-types"
import { postsStorage } from "../../../../stores/statices";

export default function ImagesPreview({images}) {
    return (
    <div className=" mx-2 flex gap-2">
        {images.map((image, key) => {
            return (<div key={key} className="relative">
                        <Trash className="absolute right-1 top-1 text-red-600"/>
                        <img className="w-24" src={ postsStorage + image.img} />
                    </div>)
        })}
    </div>
    )
}

ImagesPreview.propTypes = {
    images: propTypes.array
}

