import React, { useState , useEffect } from 'react'
import { Button, Input, InputLabel, FormControl } from '@material-ui/core';
import './App.css';
import Todo from './Todo'
import db from './firebase';
import firebase from 'firebase'

function App() {
  
  const [ todos, setTodos ] = useState([]);
  const [ input, setInput ] = useState('');

//When the app loads we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //This code gets fired when the app is refreshed
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(onsnapshot => {
      // console.log(onsnapshot.docs.map(doc => doc.data()));
      setTodos(onsnapshot.docs.map(doc => ({id: doc.id ,todo: doc.data().todo})));
    });
  }, []);

 

  const addtodo = (event) => {
    //This will fire off when the Add button is clicked
    event.preventDefault(); //This will prevent the form from REFRESHING
    // setTodos([...todos, input]);

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()

    })
    setInput('');//This will help clear the dialog box without refreshing the page
  } 

  return (
    <div className="App">
        <h1> Hello World </h1>

        <form>
        <FormControl>
          <InputLabel>✔️ Write a todo</InputLabel>
          <Input value={ input } onChange={ event => setInput(event.target.value)} />
        </FormControl>

        <Button disabled={!input} type='submit' onClick={addtodo} variant="contained" color="primary">
          Add
        </Button>
        {/* <button type='submit' onClick={addtodo}>Add</button> */}
        </form>

        <ul>
          {todos.map(todo =>(
            <Todo todo={ todo } />
            // <li>{ todo }</li>
          ))}

        </ul>
    </div>
  );
}

export default App;
