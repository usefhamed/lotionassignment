// this is the function for the editor

import { act } from '@testing-library/react';
import { useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Noteid from './Noteid';


// use {uuid.v4()} to generate a new id when needed for keys
// need to use local storage to move uuid, id, title, date and text between this and Notes.js when save is pressed.

// these format the date

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

// use this
// window.addEventListener('load', () => {
      
//     });


function Edit(){

    // getting all of the inputs
    const navigate = useNavigate();
    const [noteid, setNoteID, activeNote, getActiveNote, deleteNote, setNotes, notes, setActiveNote] = useOutletContext();
    // const newuuid = uuidv4();
    
    const [text, setText] = useState("");   // this goes to the reader function after being put in local storage
    const [title, setTitle] = useState(""); // this goes to the reader function after being put in local storage
    var [date, setDate] = useState("");     
    // console.log(text);
    // console.log(title);
    // console.log(date);
    const formdate = formatDate(date);        // this goes to the reader function after being put in local storage
    // console.log(formdate);
    useEffect(() => {
        setText(getActiveNote().text || "");
        setTitle(getActiveNote().title || "");
        setDate(getActiveNote().date || "");
    }, []);

//     useEffect(() => {
//     localStorage.setItem("notesdata", JSON.stringify(notes));
//   }, [notes])

    // const [noteid, uuid, datetoday] = useOutletContext();
    // console.log(noteid);
    // console.log(uuid);
    // console.log(datetoday);

    // console.log(getActiveNote);

    // this thing causes errors rn, need to fix later

    // function saveNote(){
        
    //     console.log("save button");
    // //     const notedata = {
    // //         notetitle: title,
    // //         notedate: formdate,
    // //         notetext: text
    // //     }
    // //     localStorage.setItem(newuuid, JSON.stringify(notedata));
    // //     navigate("/notes/" + (noteid - 1)); // this might cause issues later

    // }


    function saveNote(){
        
        console.log("save button works");
        const currnote = getActiveNote();

    
        currnote.title = title;
        currnote.text = text;
        currnote.date = date;
        currnote.id = noteid;
        currnote.uuid = activeNote;
        currnote.formdate = formatDate(date);

        // TODO update notes by using setNotes

        setNotes(notes.map((item) => item.uuid !== currnote.uuid ? item : currnote));


        console.log(currnote.title);
        console.log(currnote.text);
        console.log(currnote.date);
        console.log(currnote.uuid);
        console.log(currnote.id);


        // const actualnote = notes.find((note) => note.uuid === activeNote);

        // notes.splice(actualnote.id, 1, currnote);
    
    
        localStorage.setItem("notesdata", JSON.stringify(notes));

        navigate("/notes/" + noteid);
    
    
    }
    


    // need to make sure that the element maintains the value of the date when exited

    // date = new Date(); // setting the date's initial value to the current date

    const dateChangeHandler = (event) => {

        date = setDate(event.target.value);

    }

    return(
        <>
            <div id = "editor">
                <div id = "topbar">
                    <div id = "titledate">
                        {/* might need to change the line below to make sure that the intial title is 'Untitled', since its grey not black */}
                        <input id = "titleinput" placeholder='Untitled' value = {title} onChange = {event => setTitle(event.target.value)}></input> 
                        <input id = "dateselect" type = "datetime-local" value = {date} onChange = {dateChangeHandler} step = "1" ></input>
                    </div>
                    <div id = "savedelete">
                        <button id= "save" onClick = {saveNote}>Save</button>
                        <button id= "delete" onClick={deleteNote}>Delete</button>
                    </div>
                    
                </div>
                <ReactQuill className='editor' theme = "snow" placeholder='Your Note Here' value={text} onChange={setText}/>
            </div>
        </>
    
    )


};




export default Edit;