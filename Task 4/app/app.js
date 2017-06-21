document.addEventListener('DOMContentLoaded', function(){
//  document.querySelector(".loadedBar").style.backgroundColor = 'red'
//  document.querySelector(".loadedBar").style.width = '30%'
  function VideoPlayer(videoSection) {
//1.łapiemy kontrolki z HTML
    this.video = videoSection.querySelector('video');
    this.playPause = videoSection.querySelector('.playPause');
    this.progressBar = videoSection.querySelector('.progressBar');
    this.playbackBar = videoSection.querySelector('.playbackBar');
    this.loadedBar = videoSection.querySelector('.loadedBar');
    this.currentTime = videoSection.querySelector('.currentTime');
    this.totalTime = videoSection.querySelector('.totalTime');
    this.fullVolume = videoSection.querySelector('.fullVolume');
    this.currentVolume = videoSection.querySelector('.currentVolume');
    
    this.setCurrentVolume()
    this.assignEventListeners();
  }
  


  VideoPlayer.prototype.assignEventListeners = function (){
  //2. na prototypie VideoPlayer tworzę metode play i wiążę ją 'onclick' z przyciskiem playPouse - słowo  bind(this), sprawia że 
  //metoda bedzie się odwoływać (wiążemy ją) do instancji klasy (nowego obiektu)
    this.playPause.onclick = this.play.bind(this);
  //5. przypisujemy zdażenie onprogress ktora będzie wykonywała metodę updateLoadingProgress  
    this.video.onprogress = this.updateLoadingProgress.bind(this);
  //6. przypisuje metode timeupdate będzie aktualizowała progressBar jest na addEventListener ponieważ do time update będzie
  // przypisany jeszcze jeden event  
    this.video.addEventListener('timeupdate', this.updatePlayingProgress.bind(this),false);
  //7. Ustawianie czasu  
    this.video.ondurationchange = this.setDuration.bind(this);
  //8.Czas klipu   
    this.video.addEventListener('timeupdate', this.updateCurrentTime.bind(this), false);    
  //9. klikanie na progress bar  
    this.progressBar.onclick = this.setCurrentPlayback.bind(this);
  //10. Głośność
    this.fullVolume.onclick = this.adjustVolume.bind(this);
  //11. Ustawianie głośności
    this.video.onvolumechange = this.setVolume.bind(this);
  //13. Reset buttona
    this.video.onended = this.resetPlayer.bind(this);
  }
  
  VideoPlayer.prototype.updateLoadingProgress = function() {
  //5.1 metoda inicjuje się gdy coś się zbuforowało  
    if(this.video.buffered.length > 0) {
  //zmienna percentLoaded najpierw ile sekund zostało załadowane, dzielimy przez długość i mnożymy * 100    
      var loading = (this.video.buffered.end(0) / this.video.duration) * 100;
  //odwołujemy się do loadedBar ktory jest w html i zmieniamy jego width    
      this.loadedBar.style.width = loading + '%';
     
    }
  };
  
  //6.1. analogicznie do wcześniejszej metody 
  VideoPlayer.prototype.updatePlayingProgress = function() {

    var played = this.video.currentTime / this.video.duration * 100;

    this.playbackBar.style.width = played + "%";
    
  };
  
  //7.1 format czasu
  VideoPlayer.prototype.formatTime = function(seconds) {
  //zaokrąglamy sekudny
    var seconds = Math.round(seconds);
  //tworzymy minuty  
    var minutes = Math.floor(seconds / 60);
  //reszta  
    var remainingSeconds = seconds - minutes * 60;
    
    if (remainingSeconds == 0) {
      remainingSeconds = '00';
    } else if (remainingSeconds < 10) {
      remainingSeconds = '00' + remainingSeconds;
    }

    return minutes + ':' + seconds;

  };
  
  //7 wstawianie czasu
  VideoPlayer.prototype.setDuration = function() {

    this.totalTime.innerHTML = this.formatTime(this.video.duration);

  };
  //8 Czas trwania klipu
  VideoPlayer.prototype.updateCurrentTime = function() {
    
    this.currentTime.innerHTML = this.formatTime(this.video.currentTime);
    
  };
  
  
  //3. tworzę metode play ktora przypisałem wcześniej do przycisku
  VideoPlayer.prototype.play = function(e){
  //4. jeśli wideo jest zapauzowane - paused to właściwość obiektu pause (jeśli metoda paused jest aktywana)=> if zwraca true albo false 
  //i jeśli true włącz metode play  
    if(this.video.paused) {
      this.video.play();
  //4.1 przy okazji zmieniamy przyciski     
      e.target.classList.remove('glyphicon-play');
      e.target.classList.add('glyphicon-pause');
    } else {
      this.video.pause();
      e.target.classList.remove('glyphicon-pause');
      e.target.classList.add('glyphicon-play');
    }
    
  };
  
  //9.Przewijanie progress barem
  VideoPlayer.prototype.setCurrentPlayback = function(e) {

    var leftPos = this.progressBar.getBoundingClientRect().left;
    var clickPos = e.pageX;
    var pixelsFromLeft = clickPos - leftPos;
    var percent = (pixelsFromLeft / this.progressBar.offsetWidth);
    
    var newTime = this.video.duration * percent;
    
    this.video.currentTime = newTime;

  };
                        
  //10.Regulacja głośności
  VideoPlayer.prototype.adjustVolume = function(e){
    
    var leftPos = this.fullVolume.getBoundingClientRect().left;
    var clickPos = e.pageX;
    var pixelsFromLeft = clickPos - leftPos;
    var percent = (pixelsFromLeft / this.fullVolume.offsetWidth);

    this.video.volume = percent;
    
    this.setVolume();
  };
  
  //11
  VideoPlayer.prototype.setVolume = function(){
   
    var percent = this.video.volume * 100;
    this.currentVolume.style.width = percent + '%';
    
  }
  //12 ustawienie 
  VideoPlayer.prototype.setCurrentVolume = function(){

    var percent = this.video.volume * 100;
    this.currentVolume.style.width = (this.video.volume * 100) + '%';

  }
  //13 reset play pause
  VideoPlayer.prototype.resetPlayer = function() {
    this.playPause.classList.remove('glyphicon-pause');
    this.playPause.classList.add('glyphicon-play');
  }
  
  var videoPlayer1 = new VideoPlayer(document.getElementById('videoPlayer'));
                        
});
