// this is the function for the general layout

import { Outlet, useNavigate, useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './sidebar';


// use useEffect and useRef to add to the sidebar everytime you click the + button

// localStorage.setItem("notesdata", null);


function Layout() {
  
  const[notes, setNotes] = useState(JSON.parse(localStorage.getItem('notesdata')) || []);

  // console.log(null || []);
  // const [notes, setNotes] = useState([]);
  // console.log(notes);
  const [noteid, setNoteID] = useState(1);
  const [activeNote, setActiveNote] = useState(false);
  const navigate = useNavigate();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
        return "";
    }
    return formatted;
  };


  // change this to check for whenever the uuid or the noteid changes
  // this is useless -- the logic inside it maybe useful tho
  // window.addEventListener('load', () => {
  //   var now = new Date();
  //   now.setMinutes(now.getMinutes() - now.getTimezoneOffset());      
  //   now.setMilliseconds(null)
  //   now.setSeconds(null)
  //   today = now.toISOString().slice(0, -1);
  // });

  // function addNote(){
    
  //   var newuuid = "";
  //   var today = "";

  //   newuuid = uuidv4();

  //   var now = new Date();
  //   // console.log(now);
  //   now.setMinutes(now.getMinutes() - now.getTimezoneOffset());      
  //   now.setMilliseconds(null);
  //   now.setSeconds(null);
  //   var today = now.toISOString().slice(0, -1);

  //   console.log(today);


  //   var newNote = {
  //     uuid: newuuid,
  //     title: "",
  //     text: "",
  //     date: today,
  //   };

  //   notearray.unshift(newNote);         // adds new note to the start of the list

  //   console.log(newNote.uuid);
  //   console.log(newNote.title);
  //   console.log(newNote.text);
  //   console.log(newNote.today);

  //   console.log(notearray);

  //   // console.log(today);
  //   // add noteid to the local storage as a key to an empty list -- will add title, date, & text later into the list
  //   // localStorage.setItem(noteid, []);
  //   setNoteID(noteid + 1);    
  //   navigate('/notes/'+ noteid + '/edit');
    
  
  // }




  const addNote = () => {

    
    // const nonotemsg = document.getElementById("no-notes");    
    // if (!nonotemsg.classList.contains("hidden")){
    //   nonotemsg.classList.toggle("hidden");  
    // }
    
    var newuuid = "";
    var today = "";

    newuuid = uuidv4();

    var now = new Date();
    // console.log(now);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());      
    now.setMilliseconds(null);
    now.setSeconds(null);
    var today = now.toISOString().slice(0, -1);

    console.log(today);


    const newNote = {
      uuid: newuuid,
      id: 1,
      title: "Untitled",
      text: "",
      date: today,
      formdate: formatDate(today), 
    };

    console.log('setting notes...')
    console.log(notes)
    console.log(newNote)

    setNotes([newNote, ...notes]);

    for(let n = 1; n < notes.length; n++){
      notes[n].id = n + 1; 
    }

    // if(notes.length === 0){
    //   [notes, setNotes] = useState([newNote]);
    // }
    // else{
    //   setNotes(newNote, ...notes)
    // }


    setActiveNote(newNote.uuid);
    
    console.log(notes.length);
    // console.log(notes);

    setNoteID(noteid);    
    navigate('/notes/'+ noteid + '/edit');
    
  
  }

  function hideSidemenu(){
  
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
  
  }

  const getActiveNote = () => {
    console.log('getting active note...')
    console.log(activeNote)
    console.log(notes)
    const res = notes.find((note) => note.uuid === activeNote);
    return res ? res : {
      uuid: "",
      id: 1,
      title: "",
      text: "",
      date: "",
    };

  }

  useEffect(() => {
    localStorage.setItem("notesdata", JSON.stringify(notes));
  }, [notes])


  function deleteNote(){

    const answer = window.confirm("Are you sure?");
    if (answer) {
    
      // const nonotemsg = document.getElementById("no-notes");    
      // if (nonotemsg.classList.contains("hidden") && notes.length === 1){
      //   nonotemsg.classList.toggle("hidden");  
      // }

      console.log("button is clicked");
      setNotes(notes.filter((note) => note.uuid !== activeNote))
      
      if(notes.length === 1){
        navigate("/");
      }
      else if(notes.indexOf(getActiveNote()) === 0){        // somewhat of a hardcoded solution
        setActiveNote(notes[1].uuid);
        navigate("/notes/" + getActiveNote().id);
      }
      else{
        setActiveNote(notes[0].uuid); 
        navigate("/notes/" + getActiveNote().id);
      }
    
    }

    

  }



  return (
    <>
      <div id = "topline"></div>
      <header>
        <h2 id="sidemenu-button"> <button id = "click-side-menu-button" onClick= {hideSidemenu} >&#9776;</button></h2>
        <div id = "title">
          <h1 id = "sitename">Lotion</h1>
          <b>Like Notion, but worse.</b>
        </div>  
      </header>

      <div className = "main-container">

        <div id = "sidebar">

          <Sidebar notes = {notes} newnotefunc = {addNote} noteid = {noteid} setNoteID = {setNoteID} activeNote = {activeNote} setActiveNote = {setActiveNote}/>

        </div>

        <div id="content">
          <Outlet context={[noteid, setNoteID, activeNote, getActiveNote, deleteNote, setNotes, notes]}/>
        </div>

      </div>

    </>
  );
}


export default Layout; 