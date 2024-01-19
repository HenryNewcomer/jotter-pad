import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from './components/Tabs';
import NoteEditor from './components/NoteEditor';
import MarkdownViewer from './components/MarkdownViewer';
import NoteList from './components/NoteList';
import { addNote } from './redux/slices/notesSlice';
import './App.css';

// Mock data for testing
const mockNotes = [
    { id: 1, title: 'Note 1', content: 'Content for note 1' },
    { id: 2, title: 'Note 2', content: 'Content for note 2' },
    // Add more notes as needed
];

function App() {
    const dispatch = useDispatch()
    const [mode, setMode] = useState('edit'); // 'edit' or 'view';
    const selectedNote = useSelector(state => state.selectedNote); // Get the selected note from Redux store


    // Function to handle file selection and read its content
    const handleFileRead = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                const content = e.target.result;
                const newNote = { id: Date.now(), title: file.name, content };
                dispatch(addNote(newNote)); // Correctly placed inside onloadend
            };
            reader.readAsText(file);
        }
    };

    // Function to save the current note to a file
    const handleSaveNote = useCallback(() => {
        const currentNote = mockNotes.find(note => note.id === selectedNote);
        if (currentNote) {
            const blob = new Blob([currentNote.content], { type: 'text/plain' });
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = `${currentNote.title}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [selectedNote, mockNotes]);

    return (
        <div className="App">
            <h1>Jotter Pad</h1>
            <button onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}>
                Switch to {mode === 'edit' ? 'View' : 'Edit'} Mode
            </button>

            {mode === 'edit' ? <NoteEditor /> : <MarkdownViewer />}

            {/* Render the NoteList component */}
            <NoteList />

            {/* Conditionally render NoteEditor or MarkdownViewer based on mode */}
            {mode === 'edit' ? <NoteEditor /> : <MarkdownViewer />}
        </div>
    );
}

export default App;
