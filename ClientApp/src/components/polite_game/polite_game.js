import React from 'react'
import { Jumbotron, Button, Form, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import computerjs_1_png from '../../static/computerjs_1.png';
import callRestApi from '../RestApi';

const StartScreen = (props) => {
    return (
        <Jumbotron className="gameJumbotron display-1">
            <div>Coby's How to be Polite Game</div>
            <Button onClick={() => props.setScreen("PoliteQuestionQuiz")}>Start Game</Button>
        </Jumbotron>    
    )
}
const PoliteQuestionQuiz = (props) => {
    const [score, setScore] = React.useState(0);
    const [questions, setQuestions] = React.useState([]);
    const getQuestions = async () => {
        const questionsData = await callRestApi("Game/GetPoliteGameQuestions","GET");
        setQuestions(questionsData);
    }
    React.useEffect(() => {
        getQuestions();
    },[]);
    
    return (
        <Jumbotron className="gameJumbotron text-center">
            {questions.map(x => 
                <div id={x.id}>{JSON.stringify(x)}</div>
            )}
        </Jumbotron>   
    )
}


const Game = () => {

    const [screen, setScreen] = React.useState("StartScreen");
    const screens = {
        "StartScreen" : <StartScreen setScreen={setScreen} />, 
        "PoliteQuestionQuiz" : <PoliteQuestionQuiz setScreen={setScreen} />, 
    };
    return (
        screens[screen]
    )
}

export default Game
