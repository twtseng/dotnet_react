import React from 'react'
import { Container, Jumbotron, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import * as signalR from '@microsoft/signalr'
import authService from '../api-authorization/AuthorizeService'
import './game.css';
import TieFighter from '../../static/tie_fighter.png';

const Game = () => {

    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (x > 1000) {
                setX(x => 0);
                setY(y => 0);
            }
            setX(x => x > 1200 ? 0 : x + 10);
            setY(y => y > 1000 ? 0 : y + 5);
        }, 20);
        return () => clearInterval(interval);
    },[])

    return (
        <Container>
            <Jumbotron className="game">
                <img className="TieFighter" src={TieFighter} style={{top: y+"px",left: x+"px"}}></img>
            </Jumbotron>
        </Container>
    )
}

export default Game
