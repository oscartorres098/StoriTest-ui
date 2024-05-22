import React, { useRef, useContext, useEffect, useState } from "react";
import { Button } from "../../components/Shared/Button";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CustomizedSnackbar } from '../../components/Shared/Snackbar';
import { GlobalContext } from '../../context/GlobalContext';
import { BoxImages } from "./BoxImages";
import Cookies from 'js-cookie';
import Checkbox from '@mui/material/Checkbox';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import logoUp from '../../assets/images/logos/logo-assisttu-green-2.png';
import "./Login.css";
const MySwal = withReactContent(Swal);

function Login() {

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {checked, setChecked} = useState(false);
    const SnackbarRef = useRef();
    const history = useHistory();
    const { setToken, setEmailGlobal, setIdUserGlobal, setUserName, setUserRole, setShowNotificationsBadge, setImgUsuario, setPlanesUsuario } = useContext(GlobalContext);

    useEffect(() => {
        async function testRemember(){
            try{
                if(Cookies.get('refreshToken') !== undefined && Cookies.get('refreshToken') !== null && Cookies.get('refreshToken') !== ''
                 && Cookies.get('rememberMe') !== undefined && Cookies.get('rememberMe') !== null && Cookies.get('rememberMe') === "true"){
                    const refreshToken = Cookies.get('refreshToken');
                    let response = await fetch(`${API_BASE_URL}/users/refresh/getRefresh`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${refreshToken}`
                        },
                    });
                    let data = await response.json();
                    if (!response.ok) {
                        MySwal.fire({
                            title: `Session time expired!!`,
                            text: 'You must log in again',
                            width: 430,
                            backdrop: true,
                            customClass: {
                                popup: 'popup-sweet',
                                title: 'title-sweet',
                                htmlContainer: 'text-sweet',
                                confirmButton: 'confirm-button-sweet',
                                denyButton: 'deny-button-sweet',
                            }
                        })
                        Cookies.remove('refreshToken');
                        Cookies.remove('rememberMe');
                        throw new Error("RefreshToken Vencido");
                    }
                    try {
                        response = await fetch(`${API_BASE_URL}/users/Autologin`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `${data.token}`
                            }
                        });
                        data = await response.json();
                        if (!response.ok) {
                            throw new Error(data.message);
                        }
                        setToken(data.token);
                        setEmailGlobal(data.email);
                        setIdUserGlobal(data.id);
                        setUserName(data.name);
                        setUserRole(data.role);
                        setShowNotificationsBadge(!data.checkNotifications);
                        setImgUsuario(data.avatar);
                        setPlanesUsuario(data.planes);
            
                        //Login en socket
                        
                        history.push('/user/Home');
                    }catch (error) {
                        console.log(error);
                        throw new Error("RefreshToken Vencido");
                    }
                }else{
                    Cookies.remove('refreshToken');
                    Cookies.remove('rememberMe');
                    setToken("");
                    setEmailGlobal("");
                    setIdUserGlobal("");
                    setUserName("");
                }
            } catch (error) {
                if (error.message === "RefreshToken Vencido") {
                    console.log(error.message, error)
                    setToken("");
                    setEmailGlobal("");
                    setIdUserGlobal("");
                    setUserName("");
                    history.push('/');
                }
            }
        }
        testRemember();
    }, [setEmailGlobal, setIdUserGlobal, setToken, setUserName]);

    async function onSubmit(responseData) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(responseData),
            })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            const token = data.token;
            const email = data.email;
            const name = data.name;
            const id = data.id;
            const role = data.role;
            const planes = data.planes;
            const refreshToken = data.refreshToken;
            const refresh_expiresIn = data.refresh_expiresIn;
            const checkNotifications = data.checkNotifications;
            const imgUser = data.avatar
            setToken(token);
            setEmailGlobal(email);
            setIdUserGlobal(id);
            setUserName(name);
            setUserRole(role);
            setShowNotificationsBadge(!checkNotifications);
            setImgUsuario(imgUser);
            setPlanesUsuario(planes);

            // Calcular la fecha de expiración sumando el tiempo en segundos a la fecha actual
            const fechaExpiracion = new Date();
            fechaExpiracion.setTime(fechaExpiracion.getTime() + refresh_expiresIn * 1000);
            Cookies.set('refreshToken', refreshToken, { expires: fechaExpiracion });

            if(responseData.rememberMe){
                Cookies.set('rememberMe', responseData.rememberMe, { expires: fechaExpiracion })
            }

           
            history.push('/user/Home');
        }catch (error) {
            if (error.message === "Failed to fetch") {
                SnackbarRef.current.handleSnackbarOpen('Sorry, this should not happened. Try again', 'error');
            }
            if (error.message === "Invalid email or password") {
                SnackbarRef.current.handleSnackbarOpen('Invalid credentials', 'warning');
            }
        }
    }

    return (
        <React.Fragment>

            <CustomizedSnackbar
                open={SnackbarRef.open}
                severity={SnackbarRef.snackbarType}
                message={SnackbarRef.snackbarMessage}
                handleClose={SnackbarRef.handleClose}
                ref={SnackbarRef}
            />
            <div className="full-frame">
                <div className="login-wrap">
                    <div className="full-login-users">
                        <div className="full-frame-login">
                            <div className="logo-up-form-sign">
                                <img className='logo-up-form-sign-assisttu'
                                    src={logoUp}
                                    alt='Assisttu Logo' ></img>
                            </div>
                            <form className="frame-form-assistant-signin" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group-assistant-signin">
                                    <div className="input-frame-assistant-signin">
                                        <div>
                                            <input
                                                className={`input-signin-assistant ${errors.email && 'error'}`}
                                                type="text"
                                                placeholder="Email"
                                                {...register(
                                                    "email",
                                                    {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Invalid email address"
                                                        }
                                                    }
                                                )}
                                            />
                                            {errors.email && <span className="error-message-assistant-signin">{errors.email.message}</span>}
                                        </div>
                                        <div>
                                            <input
                                                className={`input-signin-assistant ${errors.password && 'error'}`}
                                                type="password"
                                                placeholder="Password"
                                                {...register("password", { required: "Password is required" })}
                                            />
                                            {errors.password && <span className="error-message-assistant-signin">{errors.password.message}</span>}
                                        </div>

                                    </div>
                                    <Button
                                        type="submit"
                                        buttonClassName="button-signin-assistant-signin"
                                        children="Login"
                                    />
                                </div>
                                
                            </form>
                        </div>
                        <div className="section-boxes-images">
                            <BoxImages></BoxImages>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export { Login }
