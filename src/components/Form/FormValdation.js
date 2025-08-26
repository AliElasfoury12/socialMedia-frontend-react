export class Valdatior {
    errors = {}

    formValdaite (form, validation) {
        for (let field in validation) {
            let rules = validation[field].split('|')
            rules.forEach((rule) => {
                if(rule === 'required')  this.required(form, field)
                if(rule.includes('min')) this.min(form, field, rule)
                if(rule === 'email') this.email (form, field)
            })
        }
        return this.errors
    }

    inputValdaite (validation, form, field) {
        let rules = validation[field].split('|')
    
        rules.forEach((rule) => {
            if(rule === 'required')  this.required(form, field)
            if(rule.includes('min')) this.min(form, field, rule)
            if(rule === 'email') this.email (form, field)
        })
        
        return this.errors
    }

    required (form, field) {
        const message = `${field} is required`
        if(form[field] === '') this.addError (field, message)
        else this.removeError (field, message)
    }

    min (form, field, rule) {
        const minregex = /\d/
        const min = minregex.exec(rule)[0]
        const message = `${field} must be ${min} chars at least`
        
        if(form[field]?.length < min) this.addError (field, message)
        else this.removeError (field, message)
    }

    email (form, field) {
        const emailregex = /^([a-z\d-\\.]+)@([a-z\d-]+)\.([a-z]{1,8})(\.[a-z]{1,8})?$/
        const message = 'not a vaild email'
        if(!emailregex.test(form[field])) this.addError (field, message)
        else this.removeError (field, message)
    }

    addError (field, message) {
        if(this.errors[field]){
            this.errors[field].push(message)
        }else {
            this.errors[field] = [message]
        }
    }

    removeError (field, message) {
        if(!this.errors[field]) return
        this.errors[field].filter((msg) => message != msg )
    }
}