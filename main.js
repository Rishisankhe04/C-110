Webcam.set({
    width: 350,
    height:300,
    image_format:'png',
    png_quality:90
});
Webcam.attach('#camera')
function takesnap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="captured_image">'
    });
}
console.log('ml5version:', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Eq2YqD1iv/model.json', modelloaded);
function modelloaded(){
    console.log("model is loaded");
}
function speak(){
    var synth=window.speechSynthesis
    var speakdata1="the first prediction is"+prediction1
    var speakdata2="the second prediction is"+prediction2
    var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterthis);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotresult);
}
function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_1").innerHTML=results[0].label
        document.getElementById("result_emotion_2").innerHTML=results[1].label
        prediction1=results[0].label
        prediction2=results[1].label
        speak()
        if(results[0].label=="happy"){
            document.getElementById("emoji_1").innerHTML="&#128522;";
        }
        if(results[0].label=="sad"){
            document.getElementById("emoji_1").innerHTML="&#128532;";
        }
        if(results[0].label=="angry"){
            document.getElementById("emoji_1").innerHTML="&#128548;";
        }
        if(results[0].label=="crying"){
            document.getElementById("emoji_1").innerHTML="&#128546;";
        }
        if(results[1].label=="happy"){
            document.getElementById("emoji_2").innerHTML="&#128522;";
        }
        if(results[1].label=="sad"){
            document.getElementById("emoji_2").innerHTML="&#128532;";
        }
        if(results[1].label=="angry"){
            document.getElementById("emoji_2").innerHTML="&#128548;";
        }
        if(results[1].label=="crying"){
            document.getElementById("emoji_2").innerHTML="&#128546;";
        }
    }
}