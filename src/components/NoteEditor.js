import React from 'react';
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

    return (
        <textarea
            value={noteContent}
            onChange={handleContentChange}
            className="note-editor"
        />
    );
};

export default NoteEditor;
