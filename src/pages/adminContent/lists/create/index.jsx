import React, { useContext, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GlobalContext } from '../../../../context/GlobalContext'
import { CustomizedSnackbar } from '../../../../components/Shared/Snackbar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from "../../../../components/Shared/Button";
import "./CreatePreset.css";
import { ContentHeader } from "../../../../components/Shared/ContentHeader";
import UploadUserToList from "../../../../components/users/UploadUserToList";
import { useCreateList } from "../../../../hooks";

const MySwal = withReactContent(Swal);

function CreateList() {
    const { onSubmit } = useCreateList({});
    const { setActiveBlurRegister } = useContext(GlobalContext);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const [users, setUsers] = useState([]);

    const SnackbarRef = useRef();

    useEffect(() => {
        setActiveBlurRegister(false);
    }, [])


    const handleFiles = (data) => {
        console.log(data)
        setUsers([...users, data]);
    };

    const handleOnSubmit = async (data) => {
        onSubmit(data, users)
        MySwal.fire({
            title: `List Created!!`,
            text: 'Now you can use it in the preset section',
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
                <ContentHeader text="Create List" />
            </div>
            <div className="full-frame-create">

                <div className="register-wrap">
                    <form className="form-signup" onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="signup-frame-initial-step">
                            <UploadUserToList onData={handleFiles} />
                            <div className="frame-initial-step">

                                <div className="content-wrap">
                                    <div className="form-register-first-step">
                                        <div className="form-group-input">
                                            <div>
                                                <input
                                                    className={`register-input ${errors.name ? 'error' : ''}`}
                                                    placeholder="Name"
                                                    type="text"
                                                    {...register("name", {
                                                        required: "name is required",
                                                    })}
                                                />
                                                {errors.name && <span className="error-message">{errors.name.message}</span>}
                                            </div>
                                            

                                        </div>
                                        <Button
                                            buttonClassName="button-signup-first-step"
                                            type="submit"
                                            children="Create List"
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

export { CreateList };
