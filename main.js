var audio = document.getElementById('myAudio');


window.onload = function() {
  var ctx = new AudioContext();
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
  // we have to connect the MediaElementSource with the analyser 
  audioSrc.connect(analyser);
  audioSrc.connect(ctx.destination);
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
 
  // frequencyBinCount tells you how many values you'll receive from the analyser
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);
 
  // we're ready to receive some data!
  // loop
  function renderFrame() {
     requestAnimationFrame(renderFrame);
     // update data in frequencyData
     analyser.getByteFrequencyData(frequencyData);
     // render frame based on values in frequencyData
     console.log(frequencyData)
  }
  // audio.play();
  renderFrame();
};


var isPlaying = false;

function handleClick(){
  if(isPlaying === false){
    isPlaying = true
    audio.play()
  }
  else {
    isPlaying = false
    audio.pause()
  }
}