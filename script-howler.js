var context = new (window.AudioContext || window.webkitAudioContext)();
context.suspend();

var sounds = [
	new Howl({ src: "mp3/1.mp3", html5: true }),
	new Howl({ src: "mp3/2.mp3", html5: true }),
	new Howl({ src: "mp3/3.mp3", html5: true }),
	new Howl({ src: "mp3/4.mp3", html5: true }),
	new Howl({ src: "mp3/5.mp3", html5: true }),
	new Howl({ src: "mp3/6.mp3", html5: true }),
	new Howl({ src: "mp3/7.mp3", html5: true }),
	new Howl({ src: "mp3/8.mp3", html5: true }),
	new Howl({ src: "mp3/9.mp3", html5: true }),
	new Howl({ src: "mp3/10.mp3", html5: true }),
	new Howl({ src: "mp3/11.mp3", html5: true }),
	new Howl({ src: "mp3/12.mp3", html5: true }),
	new Howl({ src: "mp3/13.mp3", html5: true }),
	// { src: "mp3/14.mp3" },
	new Howl({ src: "mp3/15.mp3", html5: true }),
	new Howl({ src: "mp3/16.mp3", html5: true }),
	new Howl({ src: "mp3/17.mp3", html5: true }),
	new Howl({ src: "mp3/18.mp3", html5: true }),
	new Howl({ src: "mp3/19.mp3", html5: true }),
	new Howl({ src: "mp3/20.mp3", html5: true }),
	new Howl({ src: "mp3/21.mp3", html5: true }),
	new Howl({ src: "mp3/22.mp3", html5: true }),
	new Howl({ src: "mp3/23.mp3", html5: true }),
	new Howl({ src: "mp3/24.mp3", html5: true }),
	new Howl({ src: "mp3/25.mp3", html5: true }),
];

const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

var currentSound = 0;
var playing = false;
var intervalId = null;

function pause() {
	musicContainer.classList.remove("play");
	playBtn.querySelector("i.fas").classList.add("fa-play");
	playBtn.querySelector("i.fas").classList.remove("fa-pause");

	sounds[currentSound].pause();
	playing = false;
	clearInterval(intervalId);
	context.suspend();
}

function play() {
	musicContainer.classList.add("play");
	playBtn.querySelector("i.fas").classList.remove("fa-play");
	playBtn.querySelector("i.fas").classList.add("fa-pause");
	sounds[currentSound].play();
	playing = true;
	title.innerText = currentSound + 1;
	context.resume();
	intervalId = setInterval(function () {
		if (!sounds[currentSound].playing()) {
			sounds[currentSound].stop();
			currentSound = (currentSound + 1) % sounds.length;
			title.innerText = currentSound + 1;
			sounds[currentSound].play();
			playing = true;
		}
	}, 5000);
}

playBtn.addEventListener("click", function () {
	if (playing) {
		pause();
	} else {
		play();
	}
});

nextBtn.addEventListener("click", function () {
	clearInterval(intervalId);
	sounds[currentSound].stop();
	currentSound = (currentSound + 1) % sounds.length;
	sounds[currentSound].play();
	playing = true;
	title.innerText = currentSound + 1;
	intervalId = setInterval(function () {
		if (!sounds[currentSound].playing()) {
			sounds[currentSound].stop();
			currentSound = (currentSound + 1) % sounds.length;
			title.innerText = currentSound + 1;
			sounds[currentSound].play();
			playing = true;
		}
	}, 5000);
});

prevBtn.addEventListener("click", function () {
	clearInterval(intervalId);
	sounds[currentSound].stop();
	currentSound = (currentSound + sounds.length - 1) % sounds.length;
	sounds[currentSound].play();
	playing = true;
	title.innerText = currentSound + 1;
	intervalId = setInterval(function () {
		if (!sounds[currentSound].playing()) {
			sounds[currentSound].stop();
			currentSound = (currentSound + 1) % sounds.length;
			title.innerText = currentSound + 1;
			sounds[currentSound].play();
			playing = true;
		}
	}, 5000);
});

// use the Page Visibility API to pause the interval when the page is hidden
// and resume it when the page becomes visible again
// let hidden, visibilityChange;
// if (typeof document.hidden !== "undefined") {
// 	hidden = "hidden";
// 	visibilityChange = "visibilitychange";
// } else if (typeof document.msHidden !== "undefined") {
// 	hidden = "msHidden";
// 	visibilityChange = "msvisibilitychange";
// } else if (typeof document.webkitHidden !== "undefined") {
// 	hidden = "webkitHidden";
// 	visibilityChange = "webkitvisibilitychange";
// }

// document.addEventListener(
// 	visibilityChange,
// 	() => {
// 		if (playing && document[hidden]) {
// 			currentSecond = sounds[currentSound].seek();
// 			pause();
// 			sounds[currentSound].seek(currentSecond);
// 			sounds[currentSound].play();
// 			play();
// 		}
// 	},
// 	false
// );
