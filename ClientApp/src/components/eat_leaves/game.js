import React from 'react'
import { Container, Jumbotron, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import * as signalR from '@microsoft/signalr'
import authService from '../api-authorization/AuthorizeService'
import './game.css';

const Game = () => {

    return (
        <Container>
            <Jumbotron className="game">
                <h1>Eat Eat Eat Leaves</h1>
            </Jumbotron>
        </Container>
    )
}

export default Game
