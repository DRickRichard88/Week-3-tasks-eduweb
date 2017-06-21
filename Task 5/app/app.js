document.addEventListener('DOMContentLoaded', function(){
  
  if(!window.FileReader) return;

  var fileInput = document.querySelector("#fileInput");
  var preview = document.querySelector("textarea");
  var converter = new showdown.Converter();

  fileInput.onchange = function() {

    var file = this.files[0];
    var reader = new FileReader();

    reader.onload = function() {
      
      console.log(this.result);
      HTMLoutput = converter.makeHtml(this.result);
      preview.innerHTML = HTMLoutput;
      preview.select();
      
    };

    reader.readAsText(file);

  };

});
