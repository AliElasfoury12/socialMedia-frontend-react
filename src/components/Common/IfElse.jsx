import PropTypes from 'prop-types'

export function IfElse ({children, condition}) {
    let element = null

    children.forEach((child) => {
        if(child.type === If && condition ){
            element = child
            return 
        }
        
        if(child.type === Else && !condition) {
            element = child
            return 
        }
    }) 
    
    return element
}

export function If ({children}) {
   return <>{children}</> 
}

export function Else ({children}) {
   return <>{children}</> 
}

IfElse.propTypes = {
    children: PropTypes.array,
    condition: PropTypes.bool
}

If.propTypes = {
    children: PropTypes.any,
}

Else.propTypes = {
    children: PropTypes.any,
}