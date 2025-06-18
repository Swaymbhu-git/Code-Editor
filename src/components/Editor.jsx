import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula'; // ✅ Correct theme package

const Editor = ({ userName }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const state = EditorState.create({
      doc: '',
      extensions: [basicSetup, javascript(), dracula],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => view.destroy(); // Cleanup on unmount
  }, []);

  return (
    <div
      ref={editorRef}
      style={{
        height: '100%',
        border: '1px solid #444',
        borderRadius: '8px',
      }}
    ></div>
  );
};

export default Editor;
