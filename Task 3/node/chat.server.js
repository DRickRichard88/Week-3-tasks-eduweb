//var ws = require('nodejs-websocket');
//
//var server = ws.createServer(function(conn){
//  console.log('Nowy klient został podłączony !');
//  conn.on('text', function(data){
//
//    var dataObj = JSON.parse(data);
//
//    if(dataObj.type == "join") {
//      conn.nickName = dataObj.name;
//      sendToAll({
//        type: "status",
//        message: conn.nickName + " dołączył/a do czatu."
//      });
//    } else if(dataObj.type == "message") {
//      sendToAll({
//        type: "message",
//        name: conn.nickName,
//        message: dataObj.message
//      });
//    }    
//  });
//  
//  conn.on('close', function(){
//    if(conn.nickName){
//      sendToAll({
//        type: 'status',
//        message: conn.nickName + ' opuścił/a chat.'
//      });
//    }
//  });
//  conn.on("error", function(e) {
//    console.log("Nieoczekiwanie przerwano połączenie!");
//  });
//}).listen(8080, 'localhost', function(){
//  console.log('Serwer działa poprawnie !');
//});
//
//function sendToAll(data){
//  var msg = JSON.stringify(data);
//  server.connection.forEach(function(conn){
//    conn.sendText(msg);
//  });
//}
var ws = require("nodejs-websocket");

var server = ws.createServer(function(conn) {

  conn.on("text", function(data) {

    var dataObj = JSON.parse(data);

    if(dataObj.type == "join") {
      conn.nickName = dataObj.name;
      sendToAll({
        type: "status",
        message: conn.nickName + " dołączył/a do czatu."
      });
    } else if(dataObj.type == "message") {
      sendToAll({
        type: "message",
        name: conn.nickName,
        message: dataObj.message
      });
    }

  });

  conn.on("close", function() {
    if(conn.nickName) {
      sendToAll({
        type: "status",
        message: conn.nickName + " opuścił czat."
      });
    }
  });

  conn.on("error", function(e) {
    console.log("Nieoczekiwanie przerwano połączenie!");
  });

}).listen(8000, "localhost", function() {
  console.log("Serwer aktywny");
});

function sendToAll(data) {
  var msg = JSON.stringify(data);
  server.connections.forEach(function(conn) {
    conn.sendText(msg);
  });
}