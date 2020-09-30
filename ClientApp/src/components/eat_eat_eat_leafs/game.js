import React from 'react'
import { Jumbotron, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import * as signalR from '@microsoft/signalr'
import authService from '../api-authorization/AuthorizeService'

const Game = () => {
    // Builds the SignalR connection, mapping it to /chat
    const [hubConnection, setHubConnection] = React.useState("");
    const [accessToken, setAccessToken] = React.useState("");
    const [myAnswer, setMyAnswer] = React.useState("");
    const [answerStatus, setAnswerStatus] = React.useState("");
    const [answerStatusColor, setAnswerStatusColor] = React.useState("text-success");

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
            });
            hub.on("AnswerWrong", (answer) => {
                setAnswerStatus(`${answer} is not correct`);
                setAnswerStatusColor("text-danger");
            });
            hub.on("AnswerRight", (answer) => {
                setAnswerStatus(`${answer} is correct`);
                setAnswerStatusColor("text-success");
            });

            // Starts the SignalR connection
            hub.start().then(() => hub.invoke("AddPlayer", token));
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
        setAnswerStatus("");
        setMyAnswer("");
        hubConnection.invoke("AddPlayer", accessToken);
    } 
    const clickReset = () => {
        setAnswerStatus("");
        setMyAnswer("");
        hubConnection.invoke("ResetGame", accessToken);
    }     
    const clickSubmit = () => {
        setMyAnswer("");
        hubConnection.invoke("CheckAnswer", accessToken, myAnswer);
    }
    return (
        <Jumbotron>
                <div className='mb-4'>
                    <Button onClick={clickJoin}>Join Game</Button>
                </div>
                <div className='mb-4'>
                    <Button onClick={clickReset}>Reset Game</Button>
                </div>
                <div className='mb-4'>
                    Status: {gameState.Status}
                </div>

                <Card  className='mb-4'>
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
                    <Card.Footer>
                    <small className={answerStatusColor}>{answerStatus}</small>
                    </Card.Footer>
                </Card>
                <Card >
                    <Card.Body>
                        <Card.Title>Players</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                    {
                        Object.keys(gameState.PlayerWins).map((player, index) => (  
                            <ListGroupItem key={index}>
                                <h5>{player}</h5>
                                <ul>
                                {
                                    gameState.PlayerWins[player].map((x, index) => <li key={index}>{x}</li>)
                                }
                                </ul>
                            </ListGroupItem>
                        
                        ))
                    }
                    </ListGroup>
                </Card>
        </Jumbotron>
    )
}

export default Game
