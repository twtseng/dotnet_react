import React from 'react'
import { Jumbotron, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import authService from '../api-authorization/AuthorizeService'
import AppContext from '../AppContext';
import { useParams } from "react-router-dom";
import zogo_1_png from '../../static/zogo_1.png';
import zogo_dodge_png from '../../static/zogodogetrall.png';
import './zogo.css';

const StartScreen = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <img src={zogo_1_png} style={{width:"80%"}}/>
            <Button className="startbutton" onClick={() => props.setScreen(1)}></Button>
        </Jumbotron>    
    )
}
const PickLevelScreen = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <h1>Pick Level Screen</h1>
            <Button className="startbutton" onClick={() => props.setScreen(2)}></Button>
        </Jumbotron>    
    )
}
const PickCharacterScreen = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <h1>Pick Character Screen</h1>
            <Button className="startbutton" onClick={() => props.setScreen(3)}></Button>
        </Jumbotron>    
    )
}
const GetReadyToDodge = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <h1>Get ready to dodge</h1>
            <Button className="startbutton" onClick={() => props.setScreen(4)}></Button>
        </Jumbotron>    
    )
}
const LavaDodge = (props) => {
    return (
        <Jumbotron className="gameJumbotron">
            <h1>Start Dodging!!!</h1>
            <img src={zogo_dodge_png} style={{width:"80%"}}/>
            <Button className="startbutton" onClick={() => props.setScreen(5)}></Button>
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
        <PickLevelScreen setScreen={setScreen} />, 
        <PickCharacterScreen setScreen={setScreen} />, 
        <GetReadyToDodge setScreen={setScreen} />,
        <LavaDodge setScreen={setScreen} />,
        <YouWin setScreen={setScreen} />
    ];
    return (
        screens[screen]
    )
}

export default Game
