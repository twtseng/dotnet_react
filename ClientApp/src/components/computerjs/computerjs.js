import React from 'react'
import { Jumbotron, Button, Form, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import authService from '../api-authorization/AuthorizeService'
import AppContext from '../AppContext';
import { useParams } from "react-router-dom";
import computerjs_1_png from '../../static/computerjs_1.png';
import computerjs_robotmazes from '../../static/computerjs_robotmazes.png';
import computerjs_maze from '../../static/computerjs_maze.png';

const StartScreen = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <img src={computerjs_1_png} style={{width:"80%"}}/>
            <Button className="startbutton" onClick={() => props.setScreen(1)}></Button>
        </Jumbotron>    
    )
}
const PasswordScreen = (props) => {
    const [password, setPassword] = React.useState("");
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            if (password !== "654889") {
                alert("Incorrect password!");
            } else {
                props.setScreen(2);
            }
        }
    }
    return (
        <Jumbotron className="gameJumbotron text-center">
              <Form.Group controlId="password">
                <Form.Label><h1>Password</h1></Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    />
            </Form.Group>
        </Jumbotron>   
    )
}
const PickCharacterScreen = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <img src={computerjs_robotmazes} style={{width:"80%"}} onClick={() => props.setScreen(3)}></img>
        </Jumbotron>      
    )
}

const Maze = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <img src={computerjs_maze} style={{width:"80%"}}/>
            <Button className="startbutton" onClick={() => props.setScreen(4)}></Button>
        </Jumbotron>    
    )
}
const YouWin = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <h1>You Win my goooooood friend</h1>
            <Button className="startbutton" onClick={() => props.setScreen(0)}></Button>
        </Jumbotron>    
    )
}
const Game = () => {

    const [screen, setScreen] = React.useState(0);
    const screens = [
        <StartScreen setScreen={setScreen} />, 
        <PasswordScreen setScreen={setScreen} />, 
        <PickCharacterScreen setScreen={setScreen} />, 
        <Maze setScreen={setScreen} />,
        <YouWin setScreen={setScreen} />
    ];
    return (
        screens[screen]
    )
}

export default Game
