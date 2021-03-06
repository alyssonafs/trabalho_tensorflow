// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/vn1z05JPG/";

async function createModel() {
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    const recognizer = speechCommands.create(
            "BROWSER_FFT", // fourier transform type, not useful to change
            undefined, // speech commands vocabulary feature, not useful for your models
            checkpointURL,
            metadataURL);

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
}
var funk = 0;
var pagode = 0;
var rock = 0;
async function init() {
    
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    const labelContainer = document.getElementById("label-container");
    for (let i = 0; i < classLabels.length; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(result => {
        const scores = result.scores; // probability of prediction for each class
        // render the probability scores per class
        for (let i = 0; i < classLabels.length; i++) {
            if (result.scores[i].toFixed(2) >= 0.85) {
                if(i === 0){
                    funk++;
                }
                if(i === 1){
                    pagode++;
                }
                if(i === 2){
                    rock++;
                }
            } else{
                labelContainer.childNodes[i].innerHTML = null;
            }
        }
    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    });

    //Stop the recognition in 5 seconds.
    setTimeout(() => recognizer.stopListening(), 20000);
    
}
async function genere() {
    const labelGenero = document.getElementById("label-genero");
    if(funk > pagode && funk > rock){
        labelGenero.innerHTML = "<p>Música do Gênero FUNK !!!</p>";
    }
    if(pagode > funk && pagode > rock){
        labelGenero.innerHTML = "<p>Música do Gênero PAGODE !!!</p>";
    }
    if(rock > pagode && rock > funk){
        labelGenero.innerHTML = "<p>Música do Gênero ROCK !!!</p>";
    }
}

