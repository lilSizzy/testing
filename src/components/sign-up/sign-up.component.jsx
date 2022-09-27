import { useState} from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


import {SignUpContainer} from './sign-up-form.styles.jsx';
import { signUpStart } from "../../store/user/user.action";

const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    comfirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setformFields] = useState(defaultformFields);
    const { displayName,email,password,comfirmPassword} = formFields;
    const dispatch = useDispatch();
    const resetFormfields = () => {
        setformFields(defaultformFields);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        if (password !== comfirmPassword){
            alert("password do not match");
            return;
        }

        try {
            dispatch(signUpStart(email,password,displayName));
            resetFormfields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }else if (error.code === 'auth/weak-password') {
                alert('password is weak, please try again')
            } 
            else {
             console.log('user creation encountered an error ',error);
            }
        }
    };

    const handleChange = (event) => {
         const {name,value} = event.target;

         setformFields({...formFields,[name]:value});
    };
    
    return (
        <SignUpContainer>
            <h2>Don't have a account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
              
                <FormInput
                label="Display Name"
                type='test' 
                onChange={handleChange} 
                name="displayName" 
                value={displayName} 
                required/>

                
                <FormInput
                label="Email"
                type='email' 
                onChange={handleChange} 
                name="email" 
                value={email} 
                required/>

                <FormInput
                label="Password" 
                type='password' 
                onChange={handleChange} 
                name="password" 
                value={password} 
                required/>

                
                <FormInput
                label="Comfirm Password"
                type='password' 
                onChange={handleChange} 
                name="comfirmPassword" 
                value={comfirmPassword} 
                required/>

            <Button type="submit"> Sign up </Button>
            </form> 
        </SignUpContainer>
    );
};

export default SignUpForm;