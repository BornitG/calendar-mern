import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
};

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
};


export const LoginPage = () => {

    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( registerFormFields );

    const onLoginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const onRegisterSubmit = ( event ) => {
        event.preventDefault();
        if ( registerPassword !== registerPassword2 ){
            Swal.fire('Registration Error', 'The password does not match', 'error');
            return;
        }
        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    useEffect(() => {
        if ( errorMessage !== undefined ) {
            Swal.fire('Authentication error', errorMessage, 'error');
        }
    
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={ onLoginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={ onRegisterSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full name"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password confirmation"
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}