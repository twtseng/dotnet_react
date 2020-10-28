import React from 'react'
import { Jumbotron, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import authService from '../api-authorization/AuthorizeService'
import AppContext from '../AppContext';
import { useParams } from "react-router-dom";
import zogo_1_png from '../../static/zogo_1.png';
import zogo_dodge_png from '../../static/zogodogetrall.png';
import './zogo.css';

const StartScreen = (setLevel) => {
    return (
        <Jumbotron className="gameJumbotron">
            <img src={zogo_1_png} style={{width:"80%"}}/>
            <Button className="startbutton" onClick={() => setLevel(1)}></Button>
        </Jumbotron>    
    )
}
const PickLevelScreen = (setLevel) => {
    return (
        <Jumbotron className="gameJumbotron">
            <h1>Pick Level Screen</h1>
            <Button className="startbutton" onClick={() => setLevel(2)}></Button>
        </Jumbotron>    
    )
}
const PickCharacterScreen = (setLevel) => {
    return (
        <Jumbotron className="gameJumbotron">
            <h1>Pick Character Screen</h1>
            <Button className="startbutton" onClick={() => setLevel(3)}></Button>
        </Jumbotron>    
    )
}
const GetReadyToDodge = (setLevel) => {
    return (
        <Jumbotron className="gameJumbotron">
            <h1>Get ready to dodge</h1>
            <Button className="startbutton" onClick={() => setLevel(4)}></Button>
        </Jumbotron>    
    )
}
const LavaDodge = (setLevel) => {
    return (
        <Jumbotron className="gameJumbotron">
            <h1>Start Dodging!!!</h1>
            <img src={zogo_dodge_png} style={{width:"80%"}}/>
            <Button className="startbutton" onClick={() => setLevel(5)}></Button>
        </Jumbotron>    
    )
}
const YouWin = (setLevel) => {
    return (
        <Jumbotron className="gameJumbotron">
            <h1>You Win</h1>
            <Button className="startbutton" onClick={() => setLevel(0)}></Button>
        </Jumbotron>    
    )
}
const Game = () => {

    const [level, setLevel] = React.useState(0);
    const screens = [
        StartScreen, 
        PickLevelScreen, 
        PickCharacterScreen, 
        GetReadyToDodge,
        LavaDodge,
        YouWin
    ];
    return (
        screens[level](setLevel)
    )
}

export default Game
