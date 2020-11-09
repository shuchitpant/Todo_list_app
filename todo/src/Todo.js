import React, { useState , useEffect } from 'react'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, ImageIcon, Button, Modal } from '@material-ui/core';
import './Todo.css';
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));



function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const updatetodo = () => {
        //Update the todo with  the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
            
        }, { merge: true })
        setOpen(false);

    };

    return (
        <div>
            <Modal open={open}
                    onClose={e => setOpen(false)}>
                        <div className={classes.paper}>
                            <h1>I am a Modal</h1>
                            <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                            <Button onClick={updatetodo} variant="contained" color="primary">Update todo</Button>
                        </div>

            </Modal>
            <List>
                <ListItem>
                    <ListItemText primary={ props.todo.todo } secondary='Dummy deadline ⏰' />
                </ListItem>
                <Button onClick={e => setOpen(true)}>Edit</Button>
                <Button onClick={event => db.collection('todos').doc(props.todo.id).delete()} variant="contained" color="secondary" > <DeleteForeverIcon variant="contained"  /> </Button>
            </List>
             
        </div>
    )
}

export default Todo;
