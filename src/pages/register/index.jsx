import React, { useContext, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { GlobalContext } from '../../context/GlobalContext'
import { CustomizedSnackbar } from '../../components/Shared/Snackbar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Button } from "../../components/Shared/Button";

import "./InitialStep.css";

import logo from '../../assets/images/logos/logo-assisttu-green-2.png';

import { useCreateUser } from "../../hooks";
const MySwal = withReactContent(Swal);

function Register() {
    const { onSubmit } = useCreateUser({});
    const { activeBlurRegister, setActiveBlurRegister } = useContext(GlobalContext)
    const {
        register,
        getValues,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm();

    const SnackbarRef = useRef();

    const history = useHistory();
    const [listInterests, setListInterests] = useState([]);

    useEffect(() => {
        setActiveBlurRegister(false);
    }, [])

    const handleOnSubmit = async (data) => {
        console.log(data)
        onSubmit(data)
        MySwal.fire({
            title: `Welcome to NewsLetter!!`,
            text: 'Get ready to recive amazing news!',
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
        setValue("email", "")
        setValue("name", "")

    };

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
                <div className="register-wrap">
                    <form className="form-signup" onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="signup-frame-initial-step">
                            <div className="hero-banner">
                                <img className='logo-hero' src={logo} alt='Assisttu Logo' />
                            </div>
                            <div className="frame-initial-step">
                                <div className="signup-stepper">
                                    <span className="subtitle">Suscribe to get amazing info in your mail</span>
                                </div>
                                <div className="content-wrap">
                                    <div className="form-register-first-step">
                                        <div className="form-group-input">
                                            <div>
                                                <input
                                                    className={`register-input ${errors.email ? 'error' : ''}`}
                                                    placeholder="Email"
                                                    type="text"
                                                    {...register("email", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Invalid email address"
                                                        }
                                                    })}
                                                />
                                                {errors.email && <span className="error-message">{errors.email.message}</span>}
                                            </div>
                                            <div>
                                                <input
                                                    className={`register-input ${errors.name ? 'error' : ''}`}
                                                    placeholder="Name"
                                                    type="text"
                                                    {...register("name", {
                                                        required: "Name is required",
                                                    })}
                                                />
                                                {errors.name && <span className="error-message">{errors.name.message}</span>}
                                            </div>
                                        </div>
                                        <Button
                                            buttonClassName="button-signup-first-step"
                                            type="submit"
                                            children="Suscribe"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export { Register };
