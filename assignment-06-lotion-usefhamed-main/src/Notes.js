// this will be the function for the viewer

import { act } from '@testing-library/react';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Noteid from './Noteid';


function Notes() {
    // var notes = JSON.parse(localStorage.getItem("notesdata"));

    const [noteid, setNoteID, activeNote, getActiveNote, deleteNote, setNotes, notes, setActiveNote] = useOutletContext();
    const navigate = useNavigate();

//    co ns getActiveNote();

    // const currnote = getActiveNote;

    // const title = document.getElementById("savedtitle");
    // title.innerHTML(currnote.title);
    
    // const date = document.getElementById("saveddate");
    // date.innerHTML(currnote.formdate);


    function editNote(){
        console.log("this button works");
        navigate("/notes/" + noteid  + "/edit")
    }

    const createMarkup = () => {
        return {__html: getActiveNote().text };
    }


    return(
        <div>
            <div id = "topbar-reader">
                <div id = "titledate">
                    <div id = "savedtitle">{getActiveNote().title }</div>
                    <div id = "saveddate">{getActiveNote().formdate}</div>
                </div>
                <div id = "savedelete">
                    <button id= "save" onClick = {editNote}>Edit</button>
                    <button id= "delete" onClick={deleteNote}>Delete</button>
                </div>
            </div>
            <div id = "savedcontent" dangerouslySetInnerHTML={createMarkup()}></div>
            

        </div>
        

    )
};

export default Notes;