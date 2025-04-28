import PropTypes from 'prop-types'
import BigLoadingSpinner from './components/LoadingSpinner/LoadingSpinner'

export default function ShowLoop(props) {
    let { loading, LoopComponent, array, message} = props

    let showArray = array?.map((item) => 
        <LoopComponent key={item.id} element={item} />
    )
    
    return (
       <div className='mb-2 w-fit m-auto'>
            <div>
                {showArray != '' ?
                    showArray :
                    <h1 className=" mt-5 text-center text-2xl text-blue-600">
                        {!loading && message} 
                    </h1> 
                }
            </div>

            <div 
                className="m-auto h-14">
                {loading &&  <BigLoadingSpinner/>} 
            </div> 
           
       </div>
    )
}

ShowLoop.propTypes = {
    loading: PropTypes.bool,
    array: PropTypes.array,
    LoopComponent: PropTypes.func,
    message: PropTypes.string,
}
