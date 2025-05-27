//import PropTypes from 'prop-types'
import './test.css'

export default function Test () {
    const images = [1,2,3]
    let gridClassrepeat = 1

    if(images.length == 2 || images.length >= 4 ) {
        gridClassrepeat = 2
    }else {
        return (
            <div className='w-20 h-20 m-auto flex gap-1'>
               <div className='flex-1 bg-black'>

               </div>
               <div className='flex-1'>
                    <div className='bg-black w-10 h-10 mb-1'>
                        
                    </div>
                    <div className='bg-black w-10 h-10'>
                        
                    </div>
               </div>
            </div>
        )
    }

    
    const showImages = images.map((image) => {
        return(
            <div key={image} className="bg-black m-1">
            </div>
        )
    })
    
    return (
        <div className={`w-20 h-20 grid grid-cols-${gridClassrepeat} border-2 m-auto`}>
            {showImages}
        </div>
    )
}

// Test.propTypes = {
// }