import PropTypes from 'prop-types'
import { Fragment, useEffect, useRef} from 'react'
import {Valdatior } from './FormValdation'
import { useState } from 'react'
import { emptyObject} from '../../utils/objects'
import { firstToUpper } from '../../utils/strings'

export default function Form(props) {
    const {fields, submit , styles ={}, validation = {}, reset = false, errors = {}, children} = props
    const [Errors, setErrors] = useState(errors)
    const formId = 'FORM-' + Math.floor(Math.random() * 100) 
    const form = useRef({})
    const valdatior = new Valdatior
    
    function handleFormInput (e, form, valdatior) {
        const input = e.target

        if(input.type == 'file'){ 
            for (let i = 0; i < input.files.length; i++) {
                form[input.name+i] = input.files[i]   
            } 
        }else
            form[input.name] = input.value  
                
        checkErrors(form, valdatior)
    }

    function handleFormSubmit(e, form, valdatior) {
        e.preventDefault()
        checkErrors(form, valdatior)

        if(emptyObject(Errors)) { 
            submit.fun(form) 
            const formElement = document.getElementById(formId)              
            if(reset && formElement) formElement.reset()
        }
    }

    function checkErrors(form, valdatior) {
        if(!emptyObject(validation)){
            const _errors = valdatior.formValdaite(form, validation)  
            setErrors(_errors) 
        }
    }

    const inputs = fields.map((f, index) => {        
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
    
    useEffect(() => {
        setErrors(errors)
    },[errors])

    return (
        <form 
            onSubmit={(e) => handleFormSubmit(e, form.current, valdatior)}
            onChange={(e) => handleFormInput (e, form.current, valdatior)}
            className={`flex flex-col ${styles.form ?? 'w-96'}`} 
            id={formId}>
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