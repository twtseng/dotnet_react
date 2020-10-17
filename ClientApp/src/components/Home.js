import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import AppContext from './AppContext';
import { Link } from 'react-router-dom';
import { Jumbotron, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'



const Home = () => {
  //static displayName = Home.name;

  const [hubGroups, setHubGroups] = React.useState([]);
  const { signalRHub } = React.useContext(AppContext);
  const sendSignalR = async (method, p1=null) => {
    console.log(`sendSignalR method:${method} p1:${p1}`)
    signalRHub.callAction("", JSON.stringify({ Method: method, Param1: p1 }))
    .then(() => console.log(`${method} succeeded`))
   // .catch(err => { console.log(`${method} failed, ${err}. Attempting reconnect`);  signalRHub.restartHub();})    
} 

React.useEffect(() => {
authService.getAccessToken()
.then((token) => {
    signalRHub.addMethod("HubGroups", (hubGroupData) => {
        setHubGroups(JSON.parse(hubGroupData));
    });
    signalRHub.startHub(token)
    .then(() => sendSignalR("GetHubGroups"));
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