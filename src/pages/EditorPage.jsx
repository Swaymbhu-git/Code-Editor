import React, { useState, useRef, useEffect } from 'react';
import Client from '../components/Client.jsx';
import toast from 'react-hot-toast';
import Editor from '../components/Editor.jsx';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import {
    useLocation,
    useNavigate,
    Navigate,
    useParams,
} from 'react-router-dom';

const EditorPage = () => {
    const socketRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    const [editorSocket, setEditorSocket] = useState(null);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            setEditorSocket(socketRef.current);

            socketRef.current.on('connect-error', (err) => handleErrors(err));
            socketRef.current.on('connect-failed', (err) => handleErrors(err));

            function handleErrors(err) {
                console.log('socket-error', err);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                userName: location.state?.userName,
            });

            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, userName, socketId }) => {
                    if (userName !== location.state?.userName) {
                        toast.success(`${userName} joined the room.`);
                    }
                    setClients(clients);
                }
            );

            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, userName }) => {
                    toast.success(`${userName} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
        };
        init();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current.off(ACTIONS.JOINED);
                socketRef.current.off(ACTIONS.DISCONNECTED);
            }
        };
    }, []);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied.');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    if (!location.state) {
        return <Navigate to="/" />;
    }

    return (
        <div className="mainWrap">
            <div className="aside">
                <div className="innerAside">
                    <div className="logo">
                        <img
                            className="logoImage"
                            src="/logo.png"
                            alt="logoOfCodeEditor"
                        />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client
                                key={client.socketId}
                                userName={client.userName}
                            />
                        ))}
                    </div>
                </div>
                <button className="btn copyBtn" onClick={copyRoomId}>
                    Copy ROOM ID
                </button>
                <button className="btn leaveBtn" onClick={leaveRoom}>
                    Leave
                </button>
            </div>
            <div className="editorWrap">
                <Editor
                    socket={editorSocket}
                    roomId={roomId}
                    onCodeChange={(code) => {
                        // This callback can be used for other features if needed
                    }}
                />
            </div>
        </div>
    );
};

export default EditorPage;