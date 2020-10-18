import React from 'react'
import { Jumbotron, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import authService from '../api-authorization/AuthorizeService'
import AppContext from '../AppContext';
import { useParams } from "react-router-dom";

const Game = () => {
    let { hubGroupId } = useParams();
    const [myAnswer, setMyAnswer] = React.useState("");
    const [answerStatus, setAnswerStatus] = React.useState("");
    const [answerStatusColor, setAnswerStatusColor] = React.useState("text-success");
    const { signalRHub } = React.useContext(AppContext);

    React.useEffect(() => {
    authService.getAccessToken()
    .then((token) => {
        signalRHub.addMethod("GameJson", (gameJson) => {
            setGameState(JSON.parse(gameJson));
        });
        signalRHub.addMethod("AnswerWrong", (answer) => {
            setAnswerStatus(`${answer} is not correct`);
            setAnswerStatusColor("text-danger");
        });
        signalRHub.addMethod("AnswerRight", (answer) => {
            setAnswerStatus(`${answer} is correct`);
            setAnswerStatusColor("text-success");
        });
        signalRHub.startHub(token)
        .then(signalRHub.callAction("", JSON.stringify({ Method: "JoinGroup", Param1: hubGroupId })));
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
    const clickReset = () => {
        setAnswerStatus("");
        setMyAnswer("");
        signalRHub.callAction(hubGroupId, JSON.stringify({ Method: "ResetGame", Param1: hubGroupId }))
    }     
    React.useEffect(() => {
        return () => {
            console.log('******************* Math Game UNMOUNTED, unjoining group');
            signalRHub.callAction("", JSON.stringify({ Method: "UnjoinGroup", Param1: hubGroupId }))
        };
    }, []);
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            setMyAnswer("");
            signalRHub.callAction(hubGroupId, JSON.stringify({ Method: "CheckAnswer", Param1: myAnswer }))
        }
    }
    return (
        <Jumbotron>
                <div className='mb-4'>
                    HubGroupId: {hubGroupId}
                </div>                
                <div className='mb-4'>
                    <Button onClick={clickReset}>Reset Game</Button>
                </div>
                    
                { gameState.GameOver ? <div className='mb-4 font-weight-bold text-success'>{gameState.Status}</div> : <div className='mb-4'>Status: {gameState.Status}</div>}

                <Card  className='mb-4'>
                    <Card.Body>
                        <Card.Title>Problem</Card.Title>
                        <Card.Text>
                        {gameState.Num1} + {gameState.Num2} =
                        </Card.Text>
                        <input type="text" value={myAnswer} onChange={e => setMyAnswer(e.target.value)} onKeyPress={handleKeyPress} />
                    </Card.Body>
                    <Card.Footer>
                    <small className={answerStatusColor}>{answerStatus}</small>
                    </Card.Footer>
                </Card>
                <Jumbotron >
                        <h3>Players</h3>
                        <div className="d-flex">
                        {
                            Object.keys(gameState.PlayerWins).map((player, index) => (
                                <Card key={index} className="bg-light mr-3">
                                    <Card.Body>
                                    <Card.Title>{player}</Card.Title>
                                    <ol>
                                    {
                                        gameState.PlayerWins[player].map((x, index) => <li key={index}>{x}</li>)
                                    }
                                    </ol>
                                    </Card.Body>
                                </Card>
                            
                            ))
                        }
                        </div>
                </Jumbotron>
        </Jumbotron>
    )
}

export default Game
