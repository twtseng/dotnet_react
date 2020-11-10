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
    const [questions, setQuestions] = React.useState([{question:"foo question", isPolite: true}]);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [status, setStatus] = React.useState("");
    const getQuestions = async () => {
        const questionsData = await callRestApi("Game/GetPoliteGameQuestions","GET");
        setQuestions(questionsData);
    }
    React.useEffect(() => {
        getQuestions();
    },[]);
    const checkAnswer = (answer) => {
        if (answer === questions[questionIndex].isPolite) {
            setStatus("Correct");
            setScore(score+1);
        } else {
            setStatus("Incorrect");
        }
        if (questionIndex >= questions.length) {
            setStatus("Game Over");
        }
    }
    const getNextQuestion = () => {
        if (questionIndex < questions.length) {
            setStatus("");
            setQuestionIndex(questionIndex+1);
        } else {
            setStatus("Game Over");
        }
    }
    return (
        <Jumbotron className="gameJumbotron text-center">
            <Card className="text-center">
                <Card.Header className="h3 text-success">
                    Score: {score}
                </Card.Header>
                <Card.Header className="h3">
                {status === "" ? <></>
                    : (
                        status === "Correct"
                        ? <div className="text-success">{status}!! {questions[questionIndex].isPolite ? "It is polite." : "It is not polite."}</div>
                        : <div className="text-danger">{status}!! {questions[questionIndex].isPolite ? "It is polite." : "It is not polite."}</div>
                        
                    )
                }
                </Card.Header>
            <Card.Body>
                <Card.Text className="h1">
                    {
                        questionIndex < questions.length
                        ? questions[questionIndex].question
                        : "Game Over"
                    }
                </Card.Text>
                
            </Card.Body>
            <Card.Footer className="text-muted">
                {
                    status === "" &&  questionIndex < questions.length
                    ? <div className="d-flex justify-content-between">
                        <Button variant="primary" onClick={() => checkAnswer(true)}>Is Polite</Button>
                        <Button variant="primary" onClick={() => checkAnswer(false)}>Is NOT Polite</Button>
                      </div>
                    : <Button variant="primary" onClick={getNextQuestion}>Next</Button>
                }
                
                
            </Card.Footer>
            </Card>
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
