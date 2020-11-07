import React from 'react'
import { Jumbotron, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import * as signalR from '@microsoft/signalr'
import authService from '../api-authorization/AuthorizeService'
import elephant from '../../static/elephant.png'

const Game = () => {


    return (
        <Jumbotron>
            <Card  className='mb-4'>
                <img src={elephant} />
            </Card>
        </Jumbotron>
    )
}

export default Game
