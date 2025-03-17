import PropTypes from 'prop-types'
import { Fragment, useEffect} from 'react'
import {Valdatior } from './FormValdation'
import { useState } from 'react'
import { emptyObject } from './utils/objects'

export default function Form(props) {
    let {fields, submit, styles ={}, validation = {}, reset = true} = props
    let id = 'FORM-' + Math.floor(Math.random() * 100) 
    let _errors = props.errors
    let [errors, setErrors] = useState(_errors)

    useEffect(() => {
        let form = document.getElementById(id)
        let inputs = form.querySelectorAll('input')
        let result = {}


        inputs.forEach((input) => {
            result[input.name] = input.value
        })

        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                result[input.name] = input.value
                let valdatior = new Valdatior
                let errors = valdatior.inputValdaite(validation, result, input.name)               
                setErrors(errors)
            })
        })
        
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            let valdatior = new Valdatior
            let errors = valdatior.formValdaite(result, validation)  
            setErrors(errors)   

            if(emptyObject(errors)) {
                submit.fun(result)
                console.log('sss');
                
                if(reset) form.reset()
            }
        })

    },[])

    useEffect (() => {
        setErrors(_errors) 
    }, [_errors])

 
    function firstToUpper (string) {
        return string[0].toUpperCase() + string.slice(1)
    }

    let inputs = fields.map((f, index) => {        
        return (
           <Fragment key={index}>
                <label className='my-1' >
                    {f.label ?? firstToUpper(f.name)}
                </label>
                <input
                    className='my-1 p-2 rounded-lg' 
                    name={f.name} 
                    type={f.type ?? 'text'}
                    placeholder={f.placeholder} />
                {errors[f.name] && <span className='text-red-600 mb-1'>{errors[f.name][0]}</span>}
           </Fragment>
        )
    })


    return (
        <form className={`flex flex-col ${styles.form ?? 'w-96'}`} id={id}>
            {inputs}
            <button type='submit' className={`mt-2 ${styles.submit ?? ''}`}>{submit.value ?? 'submit'}</button>
        </form>
    )
}

Form.propTypes = {
    fields: PropTypes.array,
    submit: PropTypes.object,
    errors: PropTypes.object,
    styles: PropTypes.object,
    validation: PropTypes.object,
    reset: PropTypes.bool,
}