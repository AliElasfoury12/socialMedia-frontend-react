import * as yup from 'yup'
import yupPassword from 'yup-password'
yupPassword(yup)

export let registerSchema = yup.object().shape({
    name:  yup.string().min(4).max(50).required('Name Field is Required'),
    email:  yup.string().email('Not a Valid Email').required('Email Field is Required'),
    password: yup.string().min(4).required('Password Field is Required'),
    password_confirmation: yup.string().min(4).required('Password Confirm Field is Required')
    .oneOf([yup.ref("password")], "password don't match!")
})

export let loginSchema = yup.object().shape({
    email:  yup.string().email('Not a Valid Email').required('Email Field is Required'),
    password: yup.string().min(4).required('Password Field is Required'),
})

export let changePasswordSchema = yup.object().shape({
    //current_password: yup.string().password().required('Current Password Field is Required'),
    current_password: yup.string().min(4).required('Current Password Field is Required'),
    new_password: yup.string().min(4).required('New Password Field is Required') ,
    new_password_confirmation: yup.string().min(4).required('Password Confirm Field is Required')
    .oneOf([yup.ref("new_password")], "password don't match!")
})

export let forgetPasswordSchema = yup.object().shape({
    email:  yup.string().email('Not a Valid Email').required('Email Field is Required'),
})

export let otpSchema = yup.object().shape({
    otp:  yup.string().min(6).required('This Field is Required'),
})

export let setNewPasswordSchema = yup.object().shape({
    password: yup.string().min(4).required('Password Field is Required'),
    password_confirmation: yup.string().min(4).required('Password Confirm Field is Required')
    .oneOf([yup.ref("password")], "password don't match!"),
})

export let updateUserSchema = yup.object().shape({
    password: yup.string().min(4).required('Password Field is Required'),
    name:  yup.string().min(4).max(50).required('Name Field is Required'),
    email:  yup.string().email('Not a Valid Email').required('Email Field is Required'),
})

export let deleteAccountSchema = yup.object().shape({
    password: yup.string().min(4).required('Password Field is Required'),
})