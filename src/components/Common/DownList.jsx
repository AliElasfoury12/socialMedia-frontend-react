import PropTypes from 'prop-types'
import ShowIf from './ShowIf'

export default function DownList({showList, onEdit, onDelete, postion }) {
    return (
        <ShowIf show={showList}>
            <div 
                className={`absolute bg-blue-500 rounded-md p-2 flex flex-col z-10 down ${postion}`}> 
                <button 
                    onClick={onEdit} 
                    className="hover:bg-blue-400 rounded-full px-5">
                    Edit
                </button>
                
                <button 
                    onClick={onDelete} 
                    className="hover:bg-blue-400 rounded-full px-2">
                    Delete
                </button>
            </div>
        </ShowIf>
    )
}

DownList.propTypes = {
    postion: PropTypes.string,
    onEdit: PropTypes.func,
    showList: PropTypes.bool,
    onDelete: PropTypes.func
}