import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({ socket, roomId, onCodeChange }) => {
    const editorRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current && !editorRef.current) {
            editorRef.current = Codemirror.fromTextArea(textareaRef.current, {
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
                lineWrapping: true,
            });
        }

        if (socket && editorRef.current) {
            const handleCodeChange = ({ code }) => {
                if (code !== null && editorRef.current.getValue() !== code) {
                    editorRef.current.setValue(code);
                }
            };
            socket.on(ACTIONS.CODE_CHANGE, handleCodeChange);

            const handleEditorChange = (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                if (onCodeChange) {
                    onCodeChange(code);
                }
                if (origin !== 'setValue') {
                    socket.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            };
            editorRef.current.on('change', handleEditorChange);

            return () => {
                socket.off(ACTIONS.CODE_CHANGE, handleCodeChange);
                // Codemirror 'change' listeners are harder to clean up this way,
                // but cleaning the socket listener prevents the biggest memory leaks.
            };
        }
    }, [socket]); // Effect depends on the socket prop

    return <textarea ref={textareaRef} />;
};

export default Editor;