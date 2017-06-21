(function() {
    var chat = {
      
      renderRow: function(dataObj) {
      //tworzenie wiadomości 1.div 2.date i time i konkatenacja
        var chatRow = document.createElement("div"),
            date = new Date(),
            time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
            message; //zmienna message na wiadomości
  
        chatRow.classList.add("chatRow");
        //jeśli data object = status tworzymy span class status 
        if(dataObj.type == "status") {
          message = "<span class='status'>" + dataObj.message + "</span>";
        //ew jeśli towiadomość tworzymy wiadomość  
        } else {
          message = "<span class='name'>" + dataObj.name + "</span><span class='message'>" + dataObj.message + "</span>";
        }
        
        chatRow.innerHTML = "<span class='time'>" + time + "</span>\n" + message;
        //wciskamy w html cały row
        this.chatWindow.appendChild(chatRow);
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
  
    },
    //wysyłanie wiadomości  
    sendData: function(msgObj) {
      var data = JSON.stringify(msgObj);
      this.socket.send(data);
    },
    //wyświetlanie wiadomości  
    displayMessage: function(e) {
      var dataObj = JSON.parse(e.data);
      this.renderRow(dataObj);
    },
      
    sendMessage: function() {

      var message = this.messageInput.value;

      if(message !== "") {
        this.sendData({
          type: "message",
          message: message
        });

        this.messageInput.value = ""; 
      }

    },

    joinToChat: function(e) {
      // name z inputa
      var name = this.nameInput.value;

      //sprawdzanie czy imię zostało podane  
        if(name !== ''){
      //łączenie z serwerem 
      //wysyłanie danych uzytkownika na serwer    
          this.sendData({
            type: 'join',
            name: name
          });
      //jeśli tak zablokuj input i button
        e.target.onlick = null;
        e.target.setAttribute("disabled", "disabled");
        this.nameInput.setAttribute("readonly", "readonly");

        // doiero teraz przypisanie onclick do sendBtn
        this.submitButton.removeAttribute("disabled");
        this.submitButton.onclick = this.sendMessage.bind(this);
      }
    },

    connectToServer: function() {
      this.socket = new WebSocket("ws://localhost:8000");
      this.socket.onmessage = this.displayMessage.bind(this);
    },
    init: function(){
      if(!window.WebSocket) return;
      //łapanie do zmiennuch inputow i buttonow
      this.nameInput = document.querySelector('#nick');
      this.joinButton = document.querySelector('#join');
      this.chatWindow = document.querySelector('#chatWindow');
      this.messageInput = document.querySelector('#msg');
      this.submitButton = document.querySelector('#sendBtn');
   
      this.joinButton.onclick = this.joinToChat.bind(this);
      //łączenie się z serwerem
      this.connectToServer();
    }
 
  }
  

  chat.init();

})();