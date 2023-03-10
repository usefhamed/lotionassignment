import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Notes from './Notes'
import Layout from './Layout'
import Edit from './Edit'
// import NoteID from './Noteid'
import NoNote from './Nonote'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route element = {<Layout />}>
              <Route path = "/" element = {<Navigate to = "/notes"/>}></Route>
              <Route path = "/notes" element = {<NoNote />}/>
              <Route path = "/notes/:noteid" element = {<Notes/>}/>
              <Route path = "/notes/:noteid/edit" element = {<Edit/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;


