import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import AppContext from './AppContext';
import { Link } from 'react-router-dom';
import { Jumbotron, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'



const Home = () => {
  //static displayName = Home.name;

  const [hubGroups, setHubGroups] = React.useState([]);
  const { signalRHub } = React.useContext(AppContext);

  React.useEffect(() => {
  authService.getAccessToken()
  .then((token) => {
      signalRHub.addMethod("HubGroups", (hubGroupData) => {
          setHubGroups(JSON.parse(hubGroupData));
      });
      signalRHub.startHub(token)
      .then(() => signalRHub.callAction("", JSON.stringify({ Method: "GetHubGroups", Param1: "" })));
  });
  },[]);  

  return (
    <Jumbotron>
      <h1>Group games</h1>
      {hubGroups.map(x => 
        <Card  className='mb-4' key={x.HubGroupId}>
          <Card.Body>
            <Card.Title>{x.ClassName}</Card.Title>
            <Card.Text>{x.HubGroupId}</Card.Text>
            <Link to={`/mathgame/${x.HubGroupId}`}>Play Destroy the Deathstar</Link>
          </Card.Body>
        </Card>
        )}
    </Jumbotron>
  );

}

export default Home;