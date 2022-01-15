img="";
status="";
objects=[];
function setup()
{
    canvas=createCanvas(380, 380);
    canvas.center();
    objectdetection=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    video=createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
}

function preload()
{
    song=loadSound("alarm.mp3");
}

function draw()
{
    image(video, 0, 0, 380, 380);
    
    
    if (status != "") {
        for ( i = 0; i < objects.length; i++) {
            objectdetection.detect(video, gotResult);
            r=random(255);
            g=random(255);
            b=random(255);
        document.getElementById("status").innerHTML="Status: Objects Detected!";
        document.getElementById("numberofobjects").innerHTML="Total Objects: "+objects.length;
        fill(r, g, b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+""+ percent +"%", objects[i].x, objects[i].y);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
        if ( objects[i].length=="person") {
            document.getElementById("numberofobjects").innerHTML="Baby Found";
            song.stop();
        } else {
            document.getElementById("numberofobjects").innerHTML="Baby Not Found";
            song.play();
        } 
        }
    }
}

function modelLoaded()
{
    console.log("model is loaded");
    status = true;
    objectdetection.detect(video, gotResult);
    
    
}

function gotResult(error, results)
{
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects= results;
    }
   
}