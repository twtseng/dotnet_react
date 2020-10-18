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
        console.log(hubGroupData);
          setHubGroups(JSON.parse(hubGroupData));
      });
      signalRHub.startHub(token)
      .then(() => signalRHub.callAction("", JSON.stringify({ Method: "GetHubGroups", Param1: "" })));
  });
  },[]);  

  return (
    <Jumbotron>
      <h1>Group games</h1>
      <div className="d-flex">
        {hubGroups.map(x => 
          <Card  className='col-3 m-4' key={x.HubGroupId}>
            <Card.Body>
              <Card.Title>{x.ClassName}</Card.Title>
              <Card.Text>Players</Card.Text>
              <Card.Text>
                <ul>
                  {
                    x.Players.map(x => <li>{x}</li>)
                  }
                </ul>
              </Card.Text>
              <Link to={`/mathgame/${x.HubGroupId}`}>Join!</Link>
            </Card.Body>
          </Card>
          )}
        </div>
    </Jumbotron>
  );

}

export default Home;