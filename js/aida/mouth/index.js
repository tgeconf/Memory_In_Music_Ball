mouth = new SpeechSynthesisUtterance();
mouth.text = "Hello, I'm Aida.";
mouth.lang = "en-US";
mouth.rate = 1.2;//0.1 - 10
mouth.onend = function(e){
	console.log("Aida finished talking in " + e.elapsedTime + " seconds.");
}

function mouthTalking(txt){
	mouth.text = txt;
	speechSynthesis.speak(mouth);
}