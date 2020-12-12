// ear.addCommands({
// 	indexes:["Hello","Hey","Hurra", "Aida","ada","eda"],
// 	action: function(i){
// 		mouthTalking("Yes, I am here to help.");
// 	}
// });

ear.addCommands({
	smart: true,// We need to say that this command is smart !
	indexes: ["what's your *", "how's your *", 'layout according to *'], // * = the spoken text after How many people live in is recognized
	action: function (i, wildcard) {
		switch (wildcard) {
			case "name":
				if (i == 0) {
					mouthTalking("My name is Aida");
				}
				break;
			case "job":
				if (i == 0) {
					mouthTalking("My job is to assist you using OrthoNJ system");
				} else if (i == 1) {
					mouthTalking("My pleasure to help you with exploring biological data");
				}
				break;
			case 'time':
				if (i === 2) {
					cmd.layoutTime = true;
				}
				break;
			default:
				mouthTalking("Sorry I don't understand you.");
				break;
		}
	}
});

ear.initialize({
	lang: "en-US",// More languages are documented in the library
	continuous: true,//if you have https connection, you can activate continuous mode
	debug: true,//Show everything in the console
	listen: true // Start listening when this function is triggered
});