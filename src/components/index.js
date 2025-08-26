const formData = {}
const form = document.getElementById('form')
form.addEventListener('input', (e) => {
    const input = e.target
    if(input.type == 'file') {
        for (let i = 0; i <input.files.length; i++) {
            formData[input.name+i] = input.files[i]   
        } 
    }else
        formData[input.name] = input.value
})

