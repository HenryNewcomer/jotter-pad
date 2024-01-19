import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from './components/Tabs';
import NoteEditor from './components/NoteEditor';
import MarkdownViewer from './components/MarkdownViewer';
import NoteList from './components/NoteList';
import { addNote, updateNoteContent } from './redux/slices/notesSlice';
import './App.css';

function App() {
    const dispatch = useDispatch();
    const [mode, setMode] = useState('edit'); // 'edit' or 'view'
    const notes = useSelector(state => state.notes); // Accessing the notes from Redux store
    const selectedNote = useSelector(state => state.selectedNote); // Get the selected note from Redux store
    const fileInputRef = useRef(null);

    // Create a new note
    const handleNewNote = () => {
        const newNote = {
            id: Date.now(),
            title: 'New Note',
            content: '',
            lastModified: new Date().toISOString()
        };
        dispatch(addNote(newNote));
        dispatch(selectNote(newNote.id)); // Automatically select the new note for editing
        setMode('edit'); // Switch to edit mode
    };

    // Handle file input for reading notes
    const handleFileRead = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                const content = e.target.result;
                const newNote = { id: Date.now(), title: file.name, content };
                dispatch(addNote(newNote));
            };
            reader.readAsText(file);
        }
    };

    // Handle saving the current note to a file
    const handleSaveNote = useCallback((noteId) => {
        const noteToSave = notes.find(note => note.id === noteId);
        if (noteToSave) {
            const blob = new Blob([noteToSave.content], { type: 'text/plain' });
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = `${noteToSave.title}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [notes]);

    // Trigger the hidden file input when the custom button is clicked
    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="App">
            <header className="header">
                <h1>Jotter Pad</h1>
                {/* Button to create a new note */}
                <button className="button" onClick={handleNewNote}>New Note</button>
            </header>
            <div className="content">
                <div className="notes-sidebar">
                    {/* NoteList component shows the list of notes on the left */}
                    <NoteList handleSaveNote={handleSaveNote} />
                    {/* File input to upload new notes */}
                    <label className="file-input-label" onClick={handleFileInputClick}>
                        Choose File
                    </label>
                    <input type="file" onChange={handleFileRead} className="file-input" ref={fileInputRef} />
                </div>
                <div className="editor-viewer-container">
                    {/* Tabs component to switch between different notes */}
                    <Tabs />
                    <div className="editor-viewer">
                        {/* Toggle button for Edit/View mode */}
                        <button className="button" onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}>
                            Switch to {mode === 'edit' ? 'View' : 'Edit'} Mode
                        </button>
                        {/* Conditional rendering based on mode */}
                        {selectedNote && (mode === 'edit' ? <NoteEditor /> : <MarkdownViewer />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
