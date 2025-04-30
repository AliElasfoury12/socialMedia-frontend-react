import PropTypes from 'prop-types'
import { Fragment, useEffect} from 'react'
import {Valdatior } from './FormValdation'
import { useState } from 'react'
import { emptyObject} from '../../utils/objects'

export default function Form(props) {
    let {fields, submit , styles ={}, validation = {}, reset = true, errors = {}, children} = props
    let id = 'FORM-' + Math.floor(Math.random() * 100) 
    let [Errors, setErrors] = useState(errors)

    useEffect(() => {
        let form = document.getElementById(id)
        let inputs = form.querySelectorAll('input, textarea')
        let result = {}
        let valdatior = new Valdatior

        inputs.forEach((input) => {
            result[input.name] = input.value

            input.addEventListener("change", () => {
                if(input.type == 'file'){ 
                    for (let i = 0; i <input.files.length; i++) {
                        result[input.name+i] = input.files[i]   
                    } 
                }else{
                    result[input.name] = input.value  
                }
                checkErrors(result, valdatior)
            })
        })
        
        
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            checkErrors(result, valdatior)

            if(emptyObject(Errors)) { 
                submit.fun(result)                
                if(reset) form.reset()
            }
        })

    },[])

    function checkErrors(result, valdatior) {
        if(!emptyObject(validation)){
            let errors = valdatior.formValdaite(result, validation)  
            setErrors(errors) 
        }
    }

    useEffect (() => {
        setErrors(errors) 
    }, [errors])

 
    function firstToUpper (string) {
        return string[0].toUpperCase() + string.slice(1)
    }

    let inputs = fields.map((f, index) => {        
        return (
           <Fragment key={index}>
                {f.label != 'no' ?
                    <label 
                        htmlFor={f.labelId ?? ''}
                        className={styles[f.name+'Label'] ? styles[f.name+'Label'] : 'my-1'}>
                        {f.label ?? firstToUpper(f.name)}
                    </label> 
                : ''}

                {f.type == 'textarea' ? 
                    <textarea 
                        className={styles[f.name] ?? 'resize-none my-1 p-2 rounded-lg'}
                        name={f.name} 
                        id={f.id}
                        placeholder={f.placeholder} />
                    :
                    <>
                        <input
                            className={styles[f.name] ?? 'my-1 p-2 rounded-lg'}
                            name={f.name} 
                            id={f.id}
                            multiple={f.multiple ?? false}
                            type={f.type ?? 'text' }
                            placeholder={f.placeholder} />
                    </>
                }

                {Errors[f.name] && <span className='text-red-600 mb-1'>{Errors[f.name][0]}</span>}
           </Fragment>
        )
    })


    return (
        <form className={`flex flex-col ${styles.form ?? 'w-96'}`} id={id}>
            {submit.position == 'top' ?  '' : inputs}
            {submit.position == 'top' ?  '' : children}
            <button type='submit' className={`mt-2 ${styles.submit ?? ''}`}>
                {submit.value ?? 'submit'}
            </button>
            {!submit.position ? '' : inputs}
            {!submit.position ? '' : children}
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
    children: PropTypes.object
}