import { useState } from "react";

import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
 } from "../../useful/fireBase/filebase.useful";

import FormInput from "../form-input/form-input.component";
import Button,{ BUTTON_TYPE_CLASSES } from "../button/button.component";

import {SignInContainer,ButtonContainer} from './sign-in-form.styles.jsx';

const defaultformFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setformFields] = useState(defaultformFields);
    const { email,password } = formFields;
 

    const resetFormfields = () => {
        setformFields(defaultformFields);
    };

const signInWithGoogle = async () => {
     await signInWithGooglePopup();    
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(
                email,
                password
            );          
            resetFormfields();
        } catch(error) {
            switch (error.code) {
                case 'auth/wrong-password' :
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user with this email');
                    break;
                default:
                    console.log(error);
            }            
        }
    };

    const handleChange = (event) => {
         const {name,value} = event.target;

         setformFields({...formFields,[name]:value});
    };
    
    return (
        <SignInContainer>
            <h2> Already have an account ?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
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
            <ButtonContainer>
            <Button type="submit"> Sign In</Button>
            <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick = {signInWithGoogle} >Google sign in</Button>
            </ButtonContainer>
            </form> 
        </SignInContainer>
    );
};

export default SignInForm;