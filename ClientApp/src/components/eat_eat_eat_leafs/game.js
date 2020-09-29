import React from 'react'
import { Jumbotron, Form, Button } from 'react-bootstrap'
import * as signalR from '@microsoft/signalr'
import authService from '../api-authorization/AuthorizeService'

const Game = () => {
    // Builds the SignalR connection, mapping it to /chat
    const [hubConnection, setHubConnection] = React.useState("");
    const [accessToken, setAccessToken] = React.useState("");

    React.useEffect(() => {
        authService.getAccessToken()
        .then((token) => {
            setAccessToken(token);
            const hub = new signalR.HubConnectionBuilder()
            .withUrl("/chathub")
            .configureLogging(signalR.LogLevel.Information)  
            .build();
            
            // Starts the SignalR connection
            hub.start().then(a => {
                // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
                if (hubConnection.connectionId) {
                hubConnection.invoke("sendConnectionId", hubConnection.connectionId);
                }   
            });
            setHubConnection(hub);
        });
    },[]);

    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const clickSubmit = () => {
        if (hubConnection.connectionId) {
            hubConnection.invoke("sendMessage", email, message, accessToken);
        }  
    }
    return (
        <Jumbotron>
            <h1>Eat Eat Eat Leafs</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Label>Text</Form.Label>
                    <Form.Control type="text" placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)} />
                </Form.Group>

                <Button variant="primary" onClick={clickSubmit}>
                    Submit
                </Button>
            </Form>
        </Jumbotron>
    )
}

export default Game
