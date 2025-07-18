import PropTypes from 'prop-types'
import BigLoadingSpinner from './LoadingSpinner/LoadingSpinner'

export default function ShowLoop(props) {
    const { loading, LoopComponent, array, message, exClass = '' } = props

    const showArray = array?.map((item) => 
        <LoopComponent key={item.id} element={item} />
    )
    
    return (
       <div className={`mb-2 w-full ${exClass}`}>
            <div>
                {showArray != '' ?
                    showArray :
                    <h1 className=" mt-5 text-center text-2xl text-blue-600">
                        {!loading && message} 
                    </h1> 
                }
            </div>

            <div 
                className="h-14 m-auto w-fit">
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
    exClass: PropTypes.string,
}
