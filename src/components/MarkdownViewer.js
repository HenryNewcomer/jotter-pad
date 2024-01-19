import React from 'react';
import { useSelector } from 'react-redux';
import { marked } from 'marked'; // If 'marked' is a named export

const MarkdownViewer = () => {
    const selectedNote = useSelector((state) => state.selectedNote);
    const notes = useSelector((state) => state.notes);
    const noteContent = notes.find(note => note.id === selectedNote)?.content || '';

    const renderedContent = marked(noteContent); // Render Markdown to HTML

    return (
        <div
            className="markdown-viewer"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
    );
};

export default MarkdownViewer;
