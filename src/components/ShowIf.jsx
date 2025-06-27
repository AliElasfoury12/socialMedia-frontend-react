import PropTypes from 'prop-types'

export default function ShowIf ({children, show}) {
    return (
       <>
        {show && children}
       </>
    )
}

ShowIf.propTypes = {
    children: PropTypes.object,
    show: PropTypes.bool
}