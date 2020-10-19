import React from 'react'
import { Jumbotron, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import authService from '../api-authorization/AuthorizeService'
import AppContext from '../AppContext';
import { useParams } from "react-router-dom";
import zogo_1_png from '../../static/zogo_1.png';
import './zogo.css';

const Game = () => {

    return (
        <Jumbotron className="gameJumbotron">
            <img src={zogo_1_png} style={{width:"80%"}}/>
            <Button className="startbutton"></Button>
        </Jumbotron>
    )
}

export default Game
