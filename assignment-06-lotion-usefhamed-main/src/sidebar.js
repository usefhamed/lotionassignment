import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useNavigate } from "react-router-dom";




function Sidebar(props){
    
    const navigate = useNavigate();

    let notes = props.notes;

    // const navigate = useNavigate()

    var activeNote = props.activeNote;

    function stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }



    return(
        <>
            <div id = "top-sidebar">
                <h3 id = "notes-word">Notes</h3>
                {/* <button id = "add-note-button" onClick = {addNote}><h3 id = "plussign">+</h3></button> */}
                <button id = "add-note-button" onClick = {props.newnotefunc}><h3 id = "plussign">+</h3></button>
            </div>
            {/* he added the code commented here */}
            {notes.length == 0 ?
            <p id = "no-notes">No Note Yet</p> : null}
            {/* <p id = "no-notes">No Note Yet</p> */}
            <div id = "savednotes">
                {notes.map((note, i)=> (
                    <div key = {i} className = {`sidebar-note ${note.uuid === activeNote && "active"}`} onClick ={() => {
                        props.setActiveNote(note.uuid)
                        navigate(`/notes/${i + 1}`) // the prof added this to navigate
                        }}>
                        <div className='sidebar-note-title'>
                            <h3 id = "note-title">{note.title}</h3>
                            <p id = "note-meta">{note.formdate}</p>
                            {/* <p id = "note-preview">{(stripHtml(note.text) && (stripHtml(note.text.substr(0, 100)) + " ...")) || "..."}</p> */}
                            <p id = "note-preview">{(stripHtml(note.text) && (stripHtml(note.text.substr(0, 100))) + " ...") || "..."}</p>

                        </div>
                    </div>
                ))}
            </div>
        </>
        
    );


}


export default Sidebar;
