import React from 'react'
import { Jumbotron, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import * as signalR from '@microsoft/signalr'
import authService from '../api-authorization/AuthorizeService'

const Game = () => {
    // Builds the SignalR connection, mapping it to /chat
    const [hubConnection, setHubConnection] = React.useState("");
    const [accessToken, setAccessToken] = React.useState("");
    const [hubmessage, setHubmessage] = React.useState("");
    const [myAnswer, setMyAnswer] = React.useState("");
    const [answerStatus, setAnswerStatus] = React.useState("");

    React.useEffect(() => {
        authService.getAccessToken()
        .then((token) => {
            setAccessToken(token);
            const hub = new signalR.HubConnectionBuilder()
            .withUrl("/hub")
            .configureLogging(signalR.LogLevel.Information)  
            .build();

            hub.on("GameJson", (gameJson) => {
                setGameState(JSON.parse(gameJson));
                setAnswerStatus("");
            });
            hub.on("AnswerWrong", (answer) => {
                setAnswerStatus(`${answer} is not correct`);
            });

            // Starts the SignalR connection
            hub.start();
            setHubConnection(hub);
        });
    },[]);

    const [gameState, setGameState] = React.useState(
        {
            PlayerWins : { 

            },
            Num1:"XXX",
            Num2:"XXX",
            Status: "Click join game to join"
        }
        );
    const clickJoin = () => {
        hubConnection.invoke("AddPlayer", accessToken);
    } 
    const clickReset = () => {
        setAnswerStatus("");
        hubConnection.invoke("ResetGame", accessToken);
    }     
    const clickSubmit = () => {
        setAnswerStatus("");
        hubConnection.invoke("CheckAnswer", accessToken, myAnswer);
    }
    return (
        <Jumbotron style={{ display: 'flex'}}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Button onClick={clickJoin}>Join Game</Button>
                </Card.Body>
                <Card.Body>
                    <Button onClick={clickReset}>Reset Game</Button>
                </Card.Body>
                <Card.Body>
                    <Card.Title>Problem</Card.Title>
                    <Card.Text>
                    {gameState.Num1} + {gameState.Num2} =
                    </Card.Text>
                    <input type="text" value={myAnswer} onChange={e => setMyAnswer(e.target.value)} />
                </Card.Body>
                <Card.Body>
                    <Button onClick={clickSubmit}>Submit Answer</Button>
                </Card.Body>
                <Card.Body className="text-danger">
                    {answerStatus}
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Players</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                {
                    Object.keys(gameState.PlayerWins).map((player, index) => (  
                        <ListGroupItem key={index}>
                            <h5>{player}</h5>
                            <ol>
                            {
                                gameState.PlayerWins[player].map((x, index) => <li key={index}>{x}</li>)
                            }
                            </ol>
                        </ListGroupItem>
                       
                    ))
                }
                 </ListGroup>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Game Status</Card.Title>
                </Card.Body>
                <Card.Body >
                    {gameState.Status}
                </Card.Body>
            </Card>
        </Jumbotron>
    )
}

export default Game
