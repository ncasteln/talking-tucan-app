// Nodes
const textArea = document.querySelector('textarea');
const playButton = document.querySelector('button');
const pitchBar = document.querySelector('.controls__pitch');
const rateBar = document.querySelector('.controls__rate')
const volumeBar = document.querySelector('.controls__volume');
const animal = document.querySelector('figure');
const voiceRadio = document.getElementsByName('voice'); // take the radio buttons named 'voice'


// get the obj containing the available voices in speechSynthesis
let voices = [];
speechSynthesis.addEventListener('voiceschanged', function() {
    voices = speechSynthesis.getVoices();
})
// Check the content of the object
/* setTimeout((a) => {
    console.log(a)
    console.log(window.speechSynthesis.getVoices());
}, 50);
console.log(voices) */


// playButton behaviour
playButton.addEventListener('click', function() {
    const textLength = textArea.value.trim().length;
    if (textLength > 0) {
        talk();
    }
});


// talk function
function talk() {
    const text = textArea.value;
    const pitch = pitchBar.value;
    const volume = volumeBar.value;
    const rate = rateBar.value;
    let voice = '';
    voiceRadio.forEach((item) => {
        if (item.checked) {
            voice += item.value;
        }
    })

    // constructor
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = 'en-US';
    // if (voice == 'cosimo') {
    //     utterance.voice = voices[0];
    // } else {
    //     utterance.voice = voices[1];
    // }
    
    // Execute the 'speak' methods, which reads the sentence
    speechSynthesis.speak(utterance);

    utterance.addEventListener('start', function() {
        textArea.disabled = true;
        playButton.disabled = true;
        pitchBar.disabled = true;
        rateBar.disabled = true;
        volumeBar.disabled = true;
        voiceRadio.disabled = true;
        animal.classList.add('talking');
    })
    utterance.addEventListener('end', function() {
        textArea.disabled = false;
        playButton.disabled = false;
        pitchBar.disabled = false;
        rateBar.disabled = false;
        volumeBar.disabled = false;
        animal.classList.remove('talking');
    })
};