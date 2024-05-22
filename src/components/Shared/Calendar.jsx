import React, { useState, useEffect, useRef, useCallback, useContext } from 'react'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { startOfDay, isSameDay } from 'date-fns';
import { useHistory } from "react-router-dom";
import dayjs from 'dayjs';

import { CustomizedSnackbar } from './Snackbar';
import { changeTimeZone } from '../../utils/utils';
import { GlobalContext } from "../../context/GlobalContext";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './SharedStyles.css'


function CalendarBox(props) {
    const { events, eventsByAssistant } = props;
    const { userRole } = useContext(GlobalContext)
    const clickRef = useRef(null)
    const SnackbarRef = useRef();
    const history = useHistory();

    const [allEvents, setAllEvents] = useState();
    const [holidayEvents, setHolidayEvents] = useState();

    useEffect(() => {
        async function updateHolidays() {
            const today = new Date();
            const actualYear = today.getFullYear();
            const eventsHolidayBefore = await getHolidayByYear(actualYear - 1);
            const eventsHolidayActual = await getHolidayByYear(actualYear);
            const eventsHolidayAfter = await getHolidayByYear(actualYear + 1);
            const holidayEvents = [...eventsHolidayBefore, ...eventsHolidayActual, ...eventsHolidayAfter];
            var allEvents = [...events, ...holidayEvents];
            if (eventsByAssistant) {
                allEvents = [...allEvents, ...eventsByAssistant];
            }
            setHolidayEvents(holidayEvents);
            setAllEvents(allEvents);

        }
        updateHolidays();

    }, [])

    useEffect(() => {
        /**
         * This is to prevent a memory leak, in the off chance that you
         * teardown your interface prior to the timed method being called.
         */
        return () => {
            window.clearTimeout(clickRef?.current)
        }
    }, [])

    const getHolidayByYear = async (year) => {
        const holidaysPerYear = fetch(`https://date.nager.at/api/v3/publicholidays/${year}/US`)
            .then((response) => (response.json()))
            .then((response) => {

                const holidayEvents = response
                    .filter((holiday) => holiday.types == "Public")
                    .map((holiday) => {
                        const typeHoliday = holiday.types;
                        if (typeHoliday !== undefined && typeHoliday == "Public") {
                            var date = new Date(holiday.date);
                            var userTimezoneOffset = date.getTimezoneOffset() * 60000;
                            date = new Date(date.getTime() + userTimezoneOffset);
                            return {
                                title: "Holiday - " + holiday.localName,
                                start: date,
                                end: date,
                            }
                        }
                    });
                return holidayEvents;
            })
            .catch((error) => {
                console.error('Error al obtener días festivos:', error);
            });

        return holidaysPerYear;
    };


    const locales = {
        'en-US': enUS,
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek: () => startOfWeek(new Date(), { locale: locales['en-US'], weekStartsOn: 1 }),
        getDay,
        locales,
    })

    const messages = {
        allDay: 'all day',
        previous: '<',
        next: '>',
    };

    function getDayProp(date) {
        const now = startOfDay(new Date());
        const day = startOfDay(new Date(date));

        if (isSameDay(day, now)) {
            return {
                style: {
                    backgroundColor: '#00B182'
                },
            };
        }
        if (holidayEvents.some(holidayDate => isSameDay(day, holidayDate.start))) {
            return {
                style: {
                    backgroundColor: 'rgb(66, 133, 255)'
                },
            };
        }

        return {};
    }

    const colorArray = ['rgba(70, 139, 255, 0.2)', 'rgba(183, 133, 255,0.2)', 'rgba(237, 192, 81,0.2)', 'rgba(234, 128, 148,0.2)'];
    const colorArrayBorder = ['rgba(70, 139, 255, 1)', 'rgba(183, 133, 255,1)', 'rgba(237, 192, 81,1)', 'rgba(234, 128, 148,1)'];

    function getEventProp(event) {

        if (holidayEvents && holidayEvents.includes(event)) {
            return {
                className: 'holiday-event',
            };
        }
        if (eventsByAssistant && eventsByAssistant.includes(event)) {
            return {
                style: {
                    backgroundColor: 'rgba(0, 71, 82, 0.2)',
                    color: 'rgba(0,0,0,1)',
                    borderColor: 'rgba(0, 71, 82, 1)',
                    borderWidth: '2px',
                    borderStyle: 'solid'
                }
            };
        }
        var colorIndex = (event.varColor % colorArray.length);
        return {
            style: {
                backgroundColor: colorArray[colorIndex],
                color: 'rgba(0,0,0,1)',
                borderColor: colorArrayBorder[colorIndex],
                borderWidth: '2px',
                borderStyle: 'solid'
            }
        };

    }

    const onSelectSlot = useCallback((slotInfo) => {
        /**
         * Here we are waiting 250 milliseconds (use what you want) prior to firing
         * our method. Why? Because both 'click' and 'doubleClick'
         * would fire, in the event of a 'doubleClick'. By doing
         * this, the 'click' handler is overridden by the 'doubleClick'
         * action.
         */
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            //Validate
            const { start, end, action } = slotInfo;
            const val = validateSelect(start, end, action);
            const dateToSend = dayjs(new Date(start));
            if (val) {
                history.push({
                    pathname: '/user/Tasks',
                    state: {
                        product: true,
                        date: dateToSend,
                    },
                });
            }
            //Redirect
        }, 250)
    }, [])

    const validateSelect = (start, end, action) => {
        if (action === 'select') {
            SnackbarRef.current.handleSnackbarOpen('Warning: Just click on the day you want to create a task.', 'info');
            return false;
        }
        const currentDate = changeTimeZone(new Date());
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        const startDate = new Date(start);
        if (startDate < currentDate) {
            SnackbarRef.current.handleSnackbarOpen('Warning: You must choose a day after today.', 'info');
            return false;
        }

        return true;
    }

    return <React.Fragment>
        <CustomizedSnackbar
            open={SnackbarRef.open}
            severity={SnackbarRef.snackbarType}
            message={SnackbarRef.snackbarMessage}
            handleClose={SnackbarRef.handleClose}
            ref={SnackbarRef}
        />
        <div>
            {allEvents && <Calendar
                localizer={localizer}
                className='calendario'
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 550 }}
                defaultDate={new Date()}
                messages={messages}
                dayPropGetter={getDayProp}
                eventPropGetter={getEventProp}
                onSelectSlot={onSelectSlot}
                selectable={userRole === 'Client' ? true : false}
            />}
        </div>
    </React.Fragment>
}






export { CalendarBox };