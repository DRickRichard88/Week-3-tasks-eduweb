document.addEventListener('DOMContentLoaded',function(){
  
  var positionOutput = document.getElementById('cords');
  var positionLink = document.getElementById('link');
  var msg = document.getElementById('msg');
  var findPosition = document.getElementById('findPosition');
  var createLink = document.getElementById('createAnchor');
  
  if(!navigator.geolocation){
    msg.innerHTML = 'Your web broweser does not support geolocalisation !';
    msg.classList.add('bg-danger');
  }else{
    msg.innerHTML = 'Your web broweser does support geolocalisation !';
    msg.classList.add('bg-info');
  }
  
  function success(pos){
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    
    positionOutput.innerHTML = 'Your position is: ' + latitude + ', ' + longitude;
    console.log('Your position is: ' + latitude + ', ' + longitude);
  }
  
  function anchorPos(pos){
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    
    positionLink.innerHTML = '';
    
    var anchor = document.createElement('a');
    
    anchor.setAttribute('href', `https://www.bing.com/maps?cp=${latitude}~${longitude}`);
    anchor.innerHTML = `https://www.bing.com/maps?cp=${latitude}~${longitude}`;
    
    positionLink.appendChild(anchor)
    
  }
  
  function error(errorObj){
    
    var errorMsg;
    
    switch(errorObj.code){
      case errorObj.PERMISION_DENIED :
        errorMsg = 'No permition for finding Your localisation !';
        break;
      case errorObj.POSTION_UNAVAILABLE :
        errorMsg = 'No internet connection !';
        break;
      case errorObj.TIMEOUT :
        errorMsg =' Time out !'
        break;
    }
    positionOutput.innerHTML = '<strong>Error has accured: </strong> '+ errorMsg;
  }
  
  var options = {
    timeout: 5000
  }
  
  findPosition.onclick = function(){
    positionOutput.innerHTML = 'Wait ...';
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
  

  createLink.onclick = function () {
    positionLink.innerHTML = 'Wait ...';
    navigator.geolocation.getCurrentPosition(anchorPos, error);

  }
});