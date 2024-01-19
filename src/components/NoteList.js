import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNote } from '../redux/slices/selectedNoteSlice';

const NoteList = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes).sort((a, b) => b.lastModified.localeCompare(a.lastModified));

    return (
        <div className="note-list">
            {notes.map(note => (
                <div key={note.id}
                     onClick={() => dispatch(selectNote(note.id))}>
                    {note.title} - {note.lastModified}
                </div>
            ))}
        </div>
    );
};

export default NoteList;
