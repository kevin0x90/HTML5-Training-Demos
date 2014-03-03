"use strict";

var self = this,
  initialCall = true;

self.addEventListener("message", incomingMessage, false);

function incomingMessage(eventData) {
	var sendMessage = eventData.data,
	  webSocket = null; 

	if(initialCall === true) {
		webSocket = initWebSocket("ws://echo.websocket.org/");
		initialCall = false
		setInterval(function() {
			webSocket.send("hello server...");
		}, 1000);
	}
}

function initWebSocket(connectionURL) {
	var webSocket = new WebSocket(connectionURL);

	webSocket.addEventListener("open", onWebSocketOpen, false);
	webSocket.addEventListener("close", onWebSocketClose, false);
	webSocket.addEventListener("message", incomingWebSocketMessage, false);
	
	return webSocket;
}

function onWebSocketOpen(eventData) {
	self.postMessage("connection opened...");
	this.send("Connection open from client...");
}

function onWebSocketClose(eventData) {
	self.postMessage("connection closed");	
}

function incomingWebSocketMessage(eventData) {
	var sendMessage = eventData.data;
	self.postMessage(sendMessage);
}
