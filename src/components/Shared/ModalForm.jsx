
import {
    Dialog, Button, TextField,
    InputAdornment, Select, MenuItem,
    InputLabel, FormControl, Checkbox,
    ListItemText, Stack,
    Typography, Switch, FormGroup, FormControlLabel
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { CustomizedSnackbar } from './Snackbar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import format from 'date-fns/format';
import { daysBetweenDates, sumDays, isWorkingDay, changeTimeZone, processHoursRecurrentTasks } from "../../utils/utils";
import './SharedStyles.css';
import { EditRecurrences } from "../../pages/clientContent/tasks/edit/EditRecurrences";

const ModalDialog = forwardRef((props, ref) => {
    const { dateVencPlan } = props;
    const [open, setOpen] = useState(false)
    const [Model, setModel] = useState([]);
    const [Title, setTitle] = useState('');
    const [typeAction, setTypeAction] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);
    const [selectSecrets, setSelectSecrets] = useState([]);
    const [mindate, setMinDate] = useState(null);
    const [minDateInitial, setMinDateInitial] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [maxDateInitial, setMaxDateInitial] = useState(null);
    const [maxDailyLimit, setMaxDailyLimit] = useState();
    const [dailyLimitNumbers, setDailyLimitNumbers] = useState(new Map());
    const [maxWordsFieldTask, setMaxWordsFieldTask] = useState([]);
    const [minLenghtDescription, setMinLenghtDescription] = useState(true);
    const [valueHours, setValueHours] = useState(0);
    const [minValueHours, setMinValueHours] = useState(0);
    const [dailyLimitHours, setDailyLimitHours] = useState(0);
    const [limitDailyHours, setLimitDailyHours] = useState(false);
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrence, setRecurrence] = useState();
    const [dateInitial, setDateInitial] = useState();
    const [dateLimit, setDateLimit] = useState();
    const [additionalInformation, setAdditionalInformation] = useState();
    const [viewSectionEditRecurrences, setViewSectionEditRecurrences] = useState(false);
    const [descriptionTaskForRec, setDescriptionTaskForRec] = useState();

    const location = useLocation();

    const ITEM_HEIGHT = 30;
    const ITEM_PADDING_TOP = 4;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {

        const currentDate = changeTimeZone(new Date());


        const currentDateCero = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            0,
            0,
            0
        );

        const currentDateFive = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            17,
            0,
            0
        );

        if (currentDate >= currentDateFive) {
            // Si es después de las 5 PM, establece minDateInitial en el día siguiente
            const nextDay = new Date(currentDateCero);
            nextDay.setDate(currentDateCero.getDate() + 1);
            setMinDateInitial(nextDay);
            setMinDate(nextDay);
        } else {
            // Si es antes de las 5 PM, establece minDateInitial en la fecha actual
            setMinDateInitial(currentDateCero);
            setMinDate(currentDateCero);
        }

        //Limitacion de max dates segun la fecha de vencimiento del plan
        // setMaxDate(new Date(dateVencPlan));
        // setMaxDateInitial(new Date(dateVencPlan));
        setMinLenghtDescription(true);
        setIsRecurring(false);
        setViewSectionEditRecurrences(false);
        if (typeAction === "create") {
            setIsRecurring(false);
            setValueHours(0);
            setIsEdit(false);
            //Se envia a minima fecha por escoger el valor de hoy
            let DailyLimitMaxs = fields[0].find(ts => ts.field === "type_creation").values;
            setMaxDailyLimit(DailyLimitMaxs[0].limit);
        } else {
            if (fields && fields.length > 0 && fields[0] && fields[0].length > 0) {

                const hours = fields && fields.length > 0 && fields[0] ? fields[0].find(ts => ts.field === "hours").value : 0;
                setValueHours(hours);
                setMinValueHours(hours);
                setMinDate(fields[0].find(ts => ts.field === "dateLimit").value);

                //Validar si la tarea es recurrente
                const rec = fields[0].find(ts => ts.field === "recurrence").value;
                setIsRecurring(rec != null ? true : false);
            }
            setIsEdit(true);
        }
    }, [typeAction, open])

    const rows = 1;
    const cols = Math.ceil(Model.length / rows);

    const fields = [];
    for (let i = 0; i < rows; i++) {
        fields.push(Model.slice(i * cols, i * cols + cols));
    }

    useEffect(() => {
        if (typeAction === 'create') {
            const newFormData = [...Model];
            newFormData.forEach((item) => {
                if (item.field !== 'taskTitle' && item.field !== 'description' && item.field !== 'saveTemplate') {
                    item.value = "";
                }
            });
            setModel(newFormData);
            setSelectSecrets([]);
            setDailyLimitHours(0);
            setRecurrence();
            setDateLimit();
            setDateInitial();
            setLimitDailyHours(false);

        }
    }, [isRecurring])

    useEffect(() => {
        if (!isRecurring) {
            if (Number(valueHours) < Number(dailyLimitHours)) {
                setLimitDailyHours(true);
            } else {
                if (limitDailyHours) {
                    setLimitDailyHours(false);
                }
            }
        }
    }, [valueHours, dailyLimitHours])

    useEffect(() => {
        async function processHoursIsRecurring() {
            try {
                if (dailyLimitHours !== null && dailyLimitHours !== undefined
                    && recurrence !== null && recurrence !== undefined
                    && dateLimit !== null && dateLimit !== undefined
                    && dateInitial !== null && dateInitial !== undefined) {

                    if (isInvalidDateLimit(dateLimit)) { return; };
                    if (isInvalidDateInitial(dateInitial)) { return; };


                    let data_process = await processHoursRecurrentTasks(dailyLimitHours, dateInitial, dateLimit, recurrence);

                    setValueHours(data_process.hoursFinal);
                    const newFormData = [...Model];
                    newFormData.forEach((item) => {
                        if (item.field === 'hours') {
                            item.value = data_process.hoursFinal;
                        }
                    });
                    setModel(newFormData);

                }

            } catch (error) {
                console.log("Error = " + error);
                setValueHours(0);
            }

        }
        if (isRecurring) {
            processHoursIsRecurring();
        }
    }, [dailyLimitHours, recurrence, dateLimit, dateInitial])

    useEffect(() => {
        // si dateInitial no tiene fecha invalida se le asigna a minDateLimit, mas un dia de inicial
        if (dateInitial && dateInitial.toString() !== 'Invalid Date') {
            var dateInitialAux = new Date(dateInitial);
            dateInitialAux.setDate(dateInitialAux.getDate() + 1);
            setMinDate(dateInitialAux);
        }
        //si  dateLimit no tiene fecha invalid, se le asigna a maxDateInitial, menos un dia de limit
        if (dateLimit && dateLimit.toString() !== 'Invalid Date') {
            var dateLimitAux = new Date(dateLimit);
            dateLimitAux.setDate(dateLimitAux.getDate() - 1);
            setMaxDateInitial(dateLimitAux);

        }

    }, [dateInitial, dateLimit])


    const SnackbarRef = useRef();


    const handleClose = () => {
        setSelectSecrets([]);
        clearFields();
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const getFieldsIgnoreEmpty = () => {
        var fieldsIgnoreEmpty = [];
        if (!isRecurring) {
            fieldsIgnoreEmpty.push("dateInitial");
        }

        return fieldsIgnoreEmpty;
    }

    const saveButtonClick = (e) => {
        e.preventDefault();

        try {
            const fieldsIgnoreEmpty = getFieldsIgnoreEmpty();
            let toInsertModel = {};
            for (let i = 0; i < Model.length; i++) {
                if (!Model[i].values && Model[i].value === '' && !fieldsIgnoreEmpty.includes(Model[i].field)) {
                    if (!emptyFields.includes(Model[i].field)) {
                        setEmptyFields(prevEmptyFields => [...prevEmptyFields, Model[i].field]);
                    }
                    SnackbarRef.current.handleSnackbarOpen(`${Model[i].headerName} field cannot be empty`, 'error');
                    return
                }
                if (Model[i].field === 'taskTitle') {
                    const inputValue = Model[i].value.trim();
                    const regex = /^\w+(\s\w+)?$/; // Expresión regular que permite un máximo de 2 palabras.
                    if (!regex.test(inputValue)) {
                        if (!maxWordsFieldTask.includes(Model[i].field)) {
                            setMaxWordsFieldTask(prevMaxWordsTask => [...prevMaxWordsTask, Model[i].field]);
                        }
                        SnackbarRef.current.handleSnackbarOpen(`${Model[i].headerName} field cannot have more than two words`, 'error');
                        return
                    }
                }
                if (Model[i].field === 'description') {
                    const inputValue = Model[i].value.trim();
                    if (inputValue.length < 15) {
                        if (!minLenghtDescription) {
                            setMinLenghtDescription(true);
                        }
                        SnackbarRef.current.handleSnackbarOpen(`${Model[i].headerName} field cannot be less than 15 letters!`, 'error');
                        return
                    }
                    setDescriptionTaskForRec(inputValue);
                }
                if (Model[i].field === 'dailyLimitHours') {
                    if (Number(Model[i].value) > Number(valueHours)) {
                        if (!limitDailyHours) {
                            setLimitDailyHours(true);
                        }
                        SnackbarRef.current.handleSnackbarOpen(`${Model[i].headerName} field cannot be greater than field Hour Limit!`, 'error');
                        return
                    }
                }
                if (Model[i].field === 'type_creation') {
                    if (Model[i].values.length <= 1) Model[i].value = Model[i].values[0].name;
                    if (Model[i].value === '') {
                        if (!emptyFields.includes(Model[i].field)) {
                            setEmptyFields(prevEmptyFields => [...prevEmptyFields, Model[i].field]);
                        }
                        SnackbarRef.current.handleSnackbarOpen(`${Model[i].headerName} field cannot be empty`, 'error');
                        return
                    }
                }
                if (Model[i].field === 'dateLimit' && !fieldsIgnoreEmpty.includes(Model[i].field)) {
                    const inputValue = Model[i].value;
                    if ((inputValue && inputValue.toString() === 'Invalid Date')) {
                        SnackbarRef.current.handleSnackbarOpen(`Invalid Date!`, 'error');
                        return;
                    }
                    if (isInvalidDateLimit(inputValue)) { return; };
                }

                if (Model[i].field === 'dateInitial' && !fieldsIgnoreEmpty.includes(Model[i].field)) {
                    const inputValue = Model[i].value;
                    if ((inputValue && inputValue === 'Invalid Date')) {
                        SnackbarRef.current.handleSnackbarOpen(`Invalid Date!`, 'error');
                        return;
                    }
                    if (isInvalidDateInitial(inputValue)) { return; };
                }
                toInsertModel[Model[i].field] = getTypeValue(Model[i].value, Model[i].type);
            }

            if (typeAction === 'create') props.onAddItem({ ...toInsertModel })
            else props.onUpdateItem({ ...toInsertModel })

            setTimeout(() => {
                handleClose();
            }, 1000);
            clearFields();
        } catch (error) {
            SnackbarRef.current.handleSnackbarOpen('Error: try again later', 'error');
        }
    };

    const isInvalidDateInitial = (date) => {
        if (date && minDateInitial && date < minDateInitial) {
            SnackbarRef.current.handleSnackbarOpen(`Invalid initial date!`, 'error');
            return true;
        }
        if (date && maxDateInitial && date > maxDateInitial) {
            SnackbarRef.current.handleSnackbarOpen(`Invalid initial date!`, 'error');
            return true;
        }
        return false;
    }

    const isInvalidDateLimit = (date) => {
        if (date && mindate && date < mindate) {
            SnackbarRef.current.handleSnackbarOpen(`Invalid date limit!`, 'error');
            return true;
        }
        if (date && maxDate && date > maxDate) {
            SnackbarRef.current.handleSnackbarOpen(`Invalid date limit!`, 'error');
            return true;
        }
        return false;
    }

    const clearFields = () => {
        location.state = {
            ...location.state,
            date: undefined,
        };
    }


    const handleChange = (e, index) => {
        const fieldsIgnoreEmpty = getFieldsIgnoreEmpty();
        const currentField = fields.flat()[index];
        if (e.target.value === '' && !fieldsIgnoreEmpty.includes(currentField.field)) {
            if (!emptyFields.includes(currentField.field)) {
                setEmptyFields(prevEmptyFields => [...prevEmptyFields, currentField.field]);
            }
        } else {
            setEmptyFields(prevEmptyFields => prevEmptyFields.filter(field => field !== currentField.field));

            if (currentField.field === 'taskTitle') {
                const inputValue = e.target.value.trim();
                const regex = /^\w+(\s\w+)?$/; // Expresión regular que permite un máximo de 2 palabras.

                if (regex.test(inputValue)) {
                    setMaxWordsFieldTask(prevMaxWordsTask => prevMaxWordsTask.filter(field => field !== currentField.field));
                } else {
                    if (!maxWordsFieldTask.includes(currentField.field)) {
                        setMaxWordsFieldTask(prevMaxWordsTask => [...prevMaxWordsTask, currentField.field]);
                    }
                }
            }

            if (currentField.field === 'description') {
                const inputValue = e.target.value.trim();
                if (inputValue.length > 15) {
                    setMinLenghtDescription(true);
                } else {
                    if (minLenghtDescription) {
                        setMinLenghtDescription(false);
                    }
                }
                setDescriptionTaskForRec(inputValue);
            }

            if (currentField.field === 'dailyLimitHours') {
                if (Number(e.target.value) < 1 || Number(e.target.value) > maxDailyLimit) {
                    return;
                } else {
                    setDailyLimitHours(e.target.value)
                }
                if (!isRecurring) {
                    if (e.target.value > valueHours) {
                        setLimitDailyHours(true);
                    } else {
                        if (limitDailyHours) {
                            setLimitDailyHours(false);
                        }
                    }
                }
            }

            if (currentField.field === 'hours') {
                if (Number(e.target.value) < minValueHours) {
                    return;
                }
                setValueHours(e.target.value)
            }

            if (currentField.field === 'recurrence') {
                const keyRecurrence = currentField.values.find(item => item.description === e.target.value)?.key;
                setRecurrence(keyRecurrence)
            }

            if (currentField.field === 'dateLimit') {
                setDateLimit(e.target.value)
            }

            if (currentField.field === 'dateInitial') {
                setDateInitial(e.target.value)
            }

        }


        const newFormData = [...Model];
        newFormData[index].value = e.target.value;
        setModel(newFormData);
    };

    const handleChangeMultiple = (e, index) => {
        const {
            target: { value },
        } = e;
        setSelectSecrets(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );


        const newFormData = [...Model];
        newFormData[index].value = e.target.value;
        setModel(newFormData);
    };

    const handleInputChangeDateLimit = (e, item) => {
        item.value = e;
        setDateLimit(e);

    };

    const handleInputChangeDateInitial = (e, item) => {
        item.value = e;
        setDateInitial(e);

    };

    // const handleInputChangeSaveTemplate = (e, item) => {
    //     item.value = e.target.checked;
    // };

    const handleAddAdditionalInfo = (e) => {
        setAdditionalInformation(e.target.value);
    }

    const handleClickAdditionalInfo = (e) => {
        e.preventDefault();
        const dateAddInfo = format(changeTimeZone(new Date()), "MM/dd/yyyy HH:mm");

        const newFormData = [...Model];
        newFormData.forEach((item) => {
            if (item.field === 'description') {
                item.value = item.value + "\n" + dateAddInfo + " => " + additionalInformation;
                setDescriptionTaskForRec(item.value);
            }
        });
        setModel(newFormData);
        setAdditionalInformation('');
    }

    const typeParsers = {
        int: (value) => parseInt(value, 10),
        string: (value) => String(value),
        date: (value) => new Date(value),
    };
    const getTypeValue = (value, type) => {
        type = type === 'number' ? 'int' : 'string';
        const parser = typeParsers[type];
        if (!parser) {
            throw new Error(`Unsupported type: ${type}`);
        }
        return parser(value);
    };

    useImperativeHandle(ref, () => ({
        handleOpen: handleOpen,
        setModel: setModel,
        setTitle: setTitle,
        setTypeAction: setTypeAction,
        setSelectSecrets: setSelectSecrets,
    }));

    return (
        <Dialog open={open} onClose={handleClose} >

            <CustomizedSnackbar
                open={SnackbarRef.open}
                severity={SnackbarRef.snackbarType}
                message={SnackbarRef.snackbarMessage}
                handleClose={SnackbarRef.handleClose}
                ref={SnackbarRef}
            />

            <form
                className="container-form"

            >
                <div className="title-form" style={{ marginBottom: '1rem' }}>
                    {Title}
                </div>

                {
                    fields.map((row, i) => (
                        <div key={i} className="textarea-general-task ">
                            {row.map((item, j) => (
                                <>
                                    {item.field !== 'id' && (
                                        item.field === 'description' ? (
                                            <div className="textarea-description-task-cliente">
                                                <label className="textarea-description-task-title">Description</label>
                                                <textarea
                                                    className="textarea-description-task-client"
                                                    key={j}
                                                    label={item.headerName}
                                                    value={item.value}
                                                    type={item.type}
                                                    onChange={(e) => handleChange(e, i * cols + j)}
                                                    readOnly={isEdit}
                                                />
                                                {!minLenghtDescription && (
                                                    <span style={{ color: "#FF5C34", fontSize: "12px" }}>Minimum 15 letters in description!</span>
                                                )}
                                            </div>
                                        ) : (item.field === 'taskTitle' ? (
                                            <div className="task-title-client-modal">
                                                <TextField
                                                    className="textarea-title-task"
                                                    key={j}
                                                    label={item.headerName}
                                                    value={item.value}
                                                    type={item.type}
                                                    onChange={(e) => handleChange(e, i * cols + j)}
                                                    size="small"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start"></InputAdornment>
                                                        )
                                                    }}
                                                    inputProps={{ readOnly: isEdit }}
                                                />

                                                {emptyFields.includes(item.field) && (
                                                    <span style={{ color: "#FF5C34", fontSize: "12px" }}>Value is required!</span>
                                                )}

                                                {maxWordsFieldTask.includes(item.field) && (
                                                    <span style={{ color: "#FF5C34", fontSize: "12px" }}>Maximum 2 words!</span>
                                                )}
                                            </div>
                                        ) : null
                                        )
                                    )}
                                </>
                            ))}
                        </div>
                    ))
                }
                {
                    typeAction === 'edit' &&
                    <div className="section-add-information-edit-task">
                        <div className="textarea-add-information-task-cliente">
                            <label className="textarea-add-information-task-title">Additional Information</label>
                            <textarea
                                className="textarea-add-information-task-client"
                                key="Additional Information"
                                label="Additional Information"
                                value={additionalInformation}
                                onChange={(e) => handleAddAdditionalInfo(e)}
                            />
                        </div>
                        <Button
                            variant="contained"
                            sx={{ margin: "1rem", height: "2rem" }}
                            className="form-button"
                            onClick={handleClickAdditionalInfo}
                        >
                            Add Info
                        </Button>
                    </div>
                }
                {
                    fields.map((row, i) => (
                        <div key={i} className="type-field-note">
                            {row.map((item, j) => (
                                <>
                                    {item.field === 'title_note' ? (
                                        <div>
                                            <TextField
                                                className="textarea-description-task"
                                                key={j}
                                                label={item.headerName}
                                                value={item.value}
                                                type={item.type}
                                                onChange={(e) => handleChange(e, i * cols + j)}
                                                size="small"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start"></InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    ) : (item.field === 'note' ? (
                                        <TextField
                                            key={j}
                                            label={item.headerName}
                                            value={item.value}
                                            type={item.type}
                                            onChange={(e) => handleChange(e, i * cols + j)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />) : null)}
                                </>
                            ))}
                        </div>
                    ))
                }
                {
                    typeAction === 'create' &&
                    <div className="switch-case-is-recurring">
                        <Stack direction="row" spacing={1} alignItems="center">
                            {/* <Typography>Off</Typography> */}
                            <Switch
                                checked={isRecurring}
                                defaultChecked={isRecurring}
                                onChange={(event) => setIsRecurring(event.target.checked)}
                                inputProps={{ 'aria-label': 'ant design' }}
                            />
                            <Typography>Recurring?</Typography>
                        </Stack>
                    </div>
                }
                {
                    fields.map((row, i) => (
                        <div key={i} className={`type-field-task${isRecurring && typeAction === "edit" ? '-edit-recurrences' : ''}`}>
                            {row.map((item, j) => (
                                <>
                                    {
                                        // item.field === 'taskTypeName' ? (
                                        //     <FormControl fullWidth>
                                        //         <InputLabel id="demo-simple-select-label label-taskType">{item.headerName}</InputLabel>
                                        //         <Select
                                        //             key={j}
                                        //             value={item.value}
                                        //             onChange={(e) => handleChange(e, i * cols + j)}
                                        //             label={item.headerName}
                                        //         >
                                        //             {item.values.map((option, k) => (
                                        //                 <MenuItem key={k} value={option}>{option}</MenuItem>
                                        //             ))}
                                        //         </Select>
                                        //     </FormControl>
                                        // ) : (

                                        item.field === "type_creation" && item.values && typeAction === "create" ? (
                                            <>
                                                {item.values.length > 1 &&

                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label label-taskType">{item.headerName}</InputLabel>
                                                        <Select
                                                            key={j}
                                                            value={item.value}
                                                            onChange={(e) => handleChange(e, i * cols + j)}
                                                            label={item.headerName}
                                                        >
                                                            {item.values.map((option, k) => (
                                                                <MenuItem key={k} value={option.name}>{option.name}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                }
                                            </>
                                        ) : ((item.field === "recurrence" && isRecurring && typeAction === "create") ? (
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label label-recurrence">{item.headerName}</InputLabel>
                                                <Select
                                                    key={j}
                                                    value={item.value}
                                                    onChange={(e) => handleChange(e, i * cols + j)}
                                                    label={item.headerName}
                                                >
                                                    {item.values.map((option, k) => (
                                                        <MenuItem key={k} value={option.description}>{option.description}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        ) : (item.field === "dateInitial" && isRecurring && typeAction === "create") ? (
                                            <div className="date-initial-form">
                                                <FormControl fullWidth >
                                                    <DatePicker
                                                        key={j}
                                                        label={item.headerName}
                                                        value={item.value === '' ? null : item.value}
                                                        onChange={(e) => handleInputChangeDateInitial(e, item)}
                                                        minDate={dayjs(minDateInitial)}
                                                        maxDate={dayjs(maxDateInitial)}
                                                    />
                                                </FormControl>
                                            </div>
                                        ) : (item.values && item.field === 'valuesVault') ? (
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-checkbox-label label-valuesVault">{item.headerName}</InputLabel>
                                                <Select
                                                    key={j}
                                                    value={Array.isArray(selectSecrets) ? selectSecrets : []}
                                                    onChange={(e) => handleChangeMultiple(e, i * cols + j)}
                                                    label={item.headerName}
                                                    multiple
                                                    renderValue={(selected) => Array.isArray(selected) ? selected.join(', ') : ''}
                                                    MenuProps={MenuProps}
                                                >
                                                    {item.values.map((name) => (
                                                        <MenuItem key={name} value={name}>
                                                            <Checkbox checked={selectSecrets.indexOf(name) > -1} />
                                                            <ListItemText primary={name} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        ) : ((item.field === 'hours' && (typeAction === "create" || !isRecurring)) ? (
                                            <FormControl fullWidth >
                                                <TextField
                                                    label={item.headerName}
                                                    type="number"
                                                    key={j}
                                                    value={!isRecurring ? item.value : valueHours}
                                                    onChange={(e) => handleChange(e, i * cols + j)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{ min: 0, readOnly: isRecurring, }}
                                                />
                                            </FormControl>
                                        ) : ((item.field === 'dailyLimitHours' && (typeAction === "create" || !isRecurring)) ? (
                                            <FormControl fullWidth >
                                                <TextField
                                                    label={item.headerName}
                                                    type="number"
                                                    key={j}
                                                    value={item.value}
                                                    onChange={(e) => handleChange(e, i * cols + j)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{ min: 0, max: maxDailyLimit }}
                                                />
                                                {limitDailyHours && (
                                                    <span style={{ color: "#FF5C34", fontSize: "12px" }}>Cannot exceed field hours!</span>
                                                )}
                                            </FormControl>
                                        ) : ((item.field === "dateLimit" && (typeAction === "create" || !isRecurring)) ? (
                                            <div className="date-form">
                                                <FormControl fullWidth >
                                                    <DatePicker
                                                        key={j}
                                                        label={item.headerName}
                                                        value={item.value === '' ? null : item.value}
                                                        onChange={(e) => handleInputChangeDateLimit(e, item)}
                                                        minDate={dayjs(mindate)}
                                                        maxDate={dayjs(maxDate)}
                                                    />
                                                </FormControl>
                                            </div>
                                        ) : ((item.field === "saveTemplate" && typeAction === "create") ? (
                                            <div>
                                                <FormGroup className="template-checkbox-container">
                                                    <FormControlLabel key={j} className="template-checkbox" control={<Checkbox defaultChecked={false} onChange={e => item.value = e.target.checked} />} label={item.headerName} />
                                                </FormGroup>
                                            </div>
                                        ) : null)))))}
                                </>
                            ))}
                        </div>
                    ))
                }
                {/* Editar recurrencias */}
                {
                    isRecurring && typeAction === "edit" &&
                    <div className="switch-case-to-edit-recurring">
                        <Stack direction="row" spacing={1} alignItems="center">
                            {/* <Typography>Off</Typography> */}
                            <Switch
                                checked={viewSectionEditRecurrences}
                                defaultChecked={viewSectionEditRecurrences}
                                onChange={(event) => setViewSectionEditRecurrences(event.target.checked)}
                                inputProps={{ 'aria-label': 'ant design' }}
                            />
                            <Typography>do you want to edit the recurrences?</Typography>
                        </Stack>
                    </div>
                }
                {
                    viewSectionEditRecurrences &&
                    <EditRecurrences
                        handleClose={handleClose}
                        infoTaskArray={Model}
                        mindate={mindate}
                        maxDate={maxDate}
                        minDateInitial={minDateInitial}
                        maxDateInitial={maxDateInitial}
                        description={descriptionTaskForRec}
                        selectSecrets={selectSecrets}
                    />
                }
                {
                    !viewSectionEditRecurrences &&
                    <div>

                        <Button
                            variant="contained"
                            className="form-button"
                            sx={{ margin: "2rem" }}
                            onClick={saveButtonClick}
                        >
                            Accept
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ margin: "2rem" }}
                            className="form-button"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </div>
                }
            </form>
        </Dialog >
    );
});


export { ModalDialog };
