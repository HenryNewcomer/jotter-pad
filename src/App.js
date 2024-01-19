import React from 'react';
import Tabs from './components/Tabs';
import NoteEditor from './components/NoteEditor';
import MarkdownViewer from './components/MarkdownViewer';
import './App.css'; // Assuming you have an App.css for basic styling

// Mock data for testing
const mockNotes = [
    { id: 1, title: 'Note 1', content: 'Content for note 1' },
    { id: 2, title: 'Note 2', content: 'Content for note 2' },
    // Add more notes as needed
];

function App() {
    return (
        <div className="App">
            <h1>Jotter Pad</h1>
            <Tabs notes={mockNotes} />
            <NoteEditor />
            <MarkdownViewer />
        </div>
    );
}

export default App;
