import * as signalR from '@microsoft/signalr';
export class SignalRHub {
    constructor () {
      this.authToken = null;
      this.methodDict = {};
      this.hub = null;
      this.connectionState = "";
    }
    // Add a client method and associated handler
    addMethod(methodName, handler) {
      this.methodDict[methodName] = handler;
    }
    restartHub() {
      this.hub = new signalR.HubConnectionBuilder()
      .withUrl(`/hub`)
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  
      for(let methodName in this.methodDict) {
        console.log(`SignalRHub registering method "${methodName}: ${this.methodDict[methodName]}`);
        this.hub.on(methodName, this.methodDict[methodName]);
      }
  console.log(`Restart hub methodDict: ${JSON.stringify(this.methodDict)}`);
      return this.hub.start();
    }
    startHub(authToken) {
      this.authToken = authToken;
      return this.restartHub();
    }
    callAction(groupId, payload) {
      console.log(`SignalRHub callAction groupId=${groupId} payload=${payload}, connection state=${this.hub.state}`);
      if (this.hub.state === signalR.HubConnectionState.Connected) {
        this.hub.invoke('CallAction', this.authToken, groupId, payload)
        .then(() => console.log(`groupId[${groupId}] payload=${payload} succeeded`))
        .catch(err => { console.log(`groupId[${groupId}] payload=${payload} failed, ${err}. Attempting reconnect`);  this.restartHub() });
      }
      else if (this.hub.state === signalR.HubConnectionState.Connecting) {
        console.log(" === Currently connecting, retry callAction in 1 second ===")
        setTimeout(() => this.callAction(groupId, payload), 1000);
      } else {
        console.log(` === Current connection state: ${this.hub.state}, restarting hub and retry callAction in 1 second ===`);
        this.restartHub()
        .then(() => { setTimeout(() => this.callAction(groupId, payload), 1000)});        
      } 
    }
    
  }