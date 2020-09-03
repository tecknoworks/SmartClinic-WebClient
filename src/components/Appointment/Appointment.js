import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useSelector, useDispatch, useStore } from 'react-redux'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { history } from '../../utils'
import { findDiagnosis } from '../../actions'
import './appointment.scss'


const localizer = momentLocalizer(moment) // or globalizeLocalizer

const useStyles = makeStyles((theme) => ({
    appBar: { position: 'relative' },
    title: { marginLeft: theme.spacing(2), flex: 1 },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Appointment(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()

    const user = useSelector(state => state.authentification.user)
    const diagnostic = useSelector(state => state.diagnosis.data);

    useEffect(() => {
    
    }, [diagnostic])

    function handleDiagnostic(selectedAppointment) {
        dispatch(findDiagnosis(selectedAppointment.id));

        if (diagnostic.length == 0) {
            if (user.role == 'DOCTOR') {
                handleClickOpen()
            } else {
                if (user.role == 'PATIENT') {
                    alert("Diagnosis is not written");
                }
            }
        } else history.push('/diagnosis')

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const events = props.events
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events.map(event => {
                    return {
                        title: event.description,
                        start: moment(event.date).toDate(),
                        end: moment(event.date).add(0.5, "hour").toDate(),
                        allDay: false,
                        id: event._id
                    }
                })}
                onSelectEvent={(selectedAppointment) => handleDiagnostic(selectedAppointment)}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700 }}
            />

            <Dialog fullWidth open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Create Diagnosis
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <div class="form-label">
                            <ListItemText primary="Diagnosis name:" />
                        </div>
                        <div class='form-text-name'>
                            <TextField name='name' />
                        </div>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <div class='form-label' >
                            <ListItemText primary="Diagnosis description:" />
                        </div>
                        <div class='form-text-description'>
                            <TextField name='description' multiline
                                rows={1}
                                rowsMax={6} />
                        </div>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    )

}
export default Appointment
