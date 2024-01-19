import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNoteContent } from '../redux/slices/notesSlice'; // Action to update note content

const NoteEditor = () => {
    const dispatch = useDispatch();
    const selectedNote = useSelector((state) => state.selectedNote);
    const notes = useSelector((state) => state.notes);
    const noteContent = notes.find(note => note.id === selectedNote)?.content || '';

    const handleContentChange = (e) => {
        dispatch(updateNoteContent({ id: selectedNote, content: e.target.value }));
    };

    useEffect(() => {
        const autoSaveInterval = setInterval(() => {
            // Logic to auto-save the note
            // For example, dispatch an action to update the note in the Redux store
        }, 3000); // Auto-save every 3 seconds

        return () => clearInterval(autoSaveInterval);
    }, [noteContent, selectedNote, dispatch]);

    return (
        <textarea
            value={noteContent}
            onChange={handleContentChange}
            className="note-editor"
        />
    );
};

export default NoteEditor;
