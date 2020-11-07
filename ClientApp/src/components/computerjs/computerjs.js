import React from 'react'
import { Jumbotron, Button, Form, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import authService from '../api-authorization/AuthorizeService'
import AppContext from '../AppContext';
import { useParams } from "react-router-dom";
import computerjs_1_png from '../../static/computerjs_1.png';
import computerjs_robotmazes from '../../static/computerjs_robotmazes.png';
import computerjs_maze from '../../static/computerjs_maze.png';
import computerjs_mathopen from '../../static/computerjs_mathopen.png';
import './computerjs.css';

const StartScreen = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <img src={computerjs_1_png} style={{width:"80%"}}/>
            <Button className="startbutton" onClick={() => props.setScreen("PasswordScreen")}></Button>
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
                props.setScreen("PickCharacterScreen");
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
           <Button className="robotbutton" onClick={() => props.setScreen("Maze")}></Button>
           <Button className="mathbutton" onClick={() => props.setScreen("Math")}></Button>
        </Jumbotron>      
    )
}

const Maze = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <img src={computerjs_maze} style={{width:"80%"}}/>
            <Button className="startbutton" onClick={() => props.setScreen("RestartOrLogout")}></Button>
        </Jumbotron>    
    )
}
const Math = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <img src={computerjs_mathopen} style={{width:"80%"}}/>
            <Button onClick={() => props.setScreen("WhatKindOfPlant")}>Open</Button>
        </Jumbotron>    
    )
}
const WhatKindOfPlant = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <div className="display-1 text-center">
                <div>WhAT KiND oF</div>
                <div>PLANT</div>
                <div>GreAT</div>
            </div>
            <div className="h1 text-left">
                <div>The MAN has <input type="text"></input> SeeD'S</div>
                <div>The MAN has <input type="text"></input> FooD</div>
                <div>The MAN has <input type="text"></input> seeDS</div>
            </div>
            <Button onClick={() => props.setScreen("RestartOrLogout")}>{"==>"}</Button>
        </Jumbotron>    
    )
}

const RestartOrLogout = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <Jumbotron><h1>Restart the game or do not play the game to take a break</h1></Jumbotron>
            
            <div className="d-flex justify-content-between">
                <Button onClick={() => alert("Please close the browser")}>Logout</Button>
                <Button onClick={() => props.setScreen("StartScreen")}>Restart Game</Button>
            </div>
        </Jumbotron>    
    )
}
const Game = () => {

    const [screen, setScreen] = React.useState("StartScreen");
    const screens = {
        "StartScreen" : <StartScreen setScreen={setScreen} />, 
        "PasswordScreen" : <PasswordScreen setScreen={setScreen} />, 
        "PickCharacterScreen" : <PickCharacterScreen setScreen={setScreen} />, 
        "Maze" : <Maze setScreen={setScreen} />,
        "RestartOrLogout" :<RestartOrLogout setScreen={setScreen} />,
        "Math" :<Math setScreen={setScreen} />,
        "WhatKindOfPlant":<WhatKindOfPlant setScreen={setScreen} />
    };
    return (
        screens[screen]
    )
}

export default Game
