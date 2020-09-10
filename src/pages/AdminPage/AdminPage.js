import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client'
import Chat from '../../components/Chat/Chat'
import './AdminPage.scss'
import { fetchQuestions, addQuestion, getUsers, deleteUser } from '../../actions';

let socket;
const ENDPOINT = 'localhost:5000'

function AdminPage() {

    const dispatch = useDispatch()
    const questions = useSelector(state => state.users.data)

    const [admin, setAdmin] = useState('admin')
    const [rooms, setRooms] = useState([])
    const [room, setRoom] = useState('')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('adminJoin')

        socket.on('roomsOnline', rooms => {
            setRooms(rooms)
            console.log(rooms)
        });

        dispatch(getUsers())
    }, [])

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.on('roomsChanged', rooms => {
            setRooms(rooms)
            console.log('11')
        })
    }, [rooms])

    function openRoom(room) {
        setRoom(room)
        setVisible(true)
    }

    function openForm(e) {
        e.preventDefault()
    }

    function closeForm(e) {
        e.preventDefault()
        setVisible(false)
    }

    useEffect(() => {
    }, [visible])


    return (
        <div>

            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    
                </tbody>
            </Table> */}

            {
                rooms.map((room, i) =>
                    <div key={i}>
                        <label> {room} </label>
                        <div>
                            <button onClick={(e) => { openRoom(room), openForm(e) }}> Open Chat </button>
                        </div>
                    </div>
                )
            }

            <div>
                <div class="totherightt">
                    <div>
                        <div>
                            {
                                visible
                                &&
                                <div class="chat-popup" id="myForm" style={{ display: visible ? 'block' : 'none' }}>
                                    <form class="form-container">
                                        <h1>Chat</h1>
                                        <div id="chat">
                                        </div>
                                        <div>
                                            <Chat
                                                name={admin}
                                                room={room}
                                            />
                                        </div>
                                        <button type="button" class="btn cancel" onClick={(e) => closeForm(e)}>Close</button>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminPage