import React, { useContext, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { GlobalContext } from '../../../../context/GlobalContext'
import { CustomizedSnackbar } from '../../../../components/Shared/Snackbar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Button } from "../../../../components/Shared/Button";

import "./CreatePreset.css";

import logo from '../../../../assets/images/logos/logo-assisttu-green-2.png';

import { useCreatePeeset, useCreateUser } from "../../../../hooks";
import FileUploadComponent from "../../../../components/files";
import { ContentHeader } from "../../../../components/Shared/ContentHeader";
const MySwal = withReactContent(Swal);

function CreatePreset() {
    const { onSubmit } = useCreatePeeset({});
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

    const [files, setFiles] = useState([]);

    const handleFiles = (data) => {
        console.log(data)
        setFiles([...files, ...data]);
    };

    const handleOnSubmit = async (data) => {
        console.log(data, files)
        onSubmit(data, files)
        MySwal.fire({
            title: `Preset Created!!`,
            text: 'Now you can use it in the schedule section',
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
            <div className="assistant-header" >
                <ContentHeader text="Create Preset" />
            </div>
            <div className="full-frame-create">

                <div className="register-wrap">
                    <form className="form-signup" onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="signup-frame-initial-step">
                            <FileUploadComponent onData={handleFiles} />
                            <div className="frame-initial-step">

                                <div className="content-wrap">
                                    <div className="form-register-first-step">
                                        <div className="form-group-input">
                                            <div>
                                                <input
                                                    className={`register-input ${errors.email ? 'error' : ''}`}
                                                    placeholder="Subject"
                                                    type="text"
                                                    {...register("subject", {
                                                        required: "Subject is required",
                                                    })}
                                                />
                                                {errors.email && <span className="error-message">{errors.email.message}</span>}
                                            </div>
                                            <div>
                                                <select
                                                    className={`register-input ${errors.html ? 'error' : ''}`}
                                                    {...register("html", {
                                                        required: "Html is required",
                                                    })}
                                                >
                                                    <option value="">Select a HTML template</option>
                                                    <option value="green">Green</option>
                                                    <option value="red">Red</option>
                                                    <option value="blue">Blue</option>
                                                </select>
                                                {errors.html && <span className="error-message">{errors.html.message}</span>}
                                            </div>
                                            <div>
                                                <input
                                                    className={`register-input ${errors.title ? 'error' : ''}`}
                                                    placeholder="Title"
                                                    type="text"
                                                    {...register("title", {
                                                        required: "Title is required",
                                                    })}
                                                />
                                                {errors.title && <span className="error-message">{errors.title.message}</span>}

                                            </div>
                                            <div>
                                                <textarea
                                                    className={`register-input ${errors.body ? 'error' : ''}`}
                                                    placeholder="Body"
                                                    {...register("body", {
                                                        required: "body is required",
                                                    })}
                                                ></textarea>
                                                {errors.body && <span className="error-message">{errors.body.message}</span>}
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

export { CreatePreset };
