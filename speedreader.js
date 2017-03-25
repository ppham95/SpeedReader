/*

Phu-Lam Pham 
CSE 154 AO
HW 3

JavaScript handling functionalites for SpeedReader webpage

*/
(function() {
    "use strict";
	
    var input = "";                 // input text
    var speedWPM = 171;             // default wpm speed
    var readingAnimation = null;    
    var wordList = null;            // words to be played as frames            
    var currentFrame = 0;           // current reading frame in order
    var repeat = false;
    
    // Set up event handler on load
    window.onload = function() {
        var start = document.getElementById("start");
        start.onclick = startAnimation;

        var stop = document.getElementById("stop");
        stop.onclick = stopAnimation;
        
        document.getElementById("speed").onchange = changeSpeed;
        
        for (var i = 0; i < document.getElementsByName("size").length; i++) {
            document.getElementsByName("size")[i].onchange = changeSize;
        }
    };
    
    // Start reading animation
    function startAnimation(){
        input = document.getElementById("textBox");
        document.getElementById("stop").disabled = false; 
        document.getElementById("start").disabled = true;		
        wordList = input.value.split(/[ \t\n]+/);
        readingAnimation = setInterval(animation, speedWPM); 
    }
    
    // Stop reading animation
    function stopAnimation(){
        document.getElementById("textBox").disabled = false;
        document.getElementById("start").disabled = false;
        document.getElementById("stop").disabled = true; 	
        clearInterval(readingAnimation);
        readingAnimation = null;
        document.getElementById("animationBox").innerHTML = "";	
    }
    
    // Change reading text size
    function changeSize(){
        var animationBox = document.getElementById("animationBox");
        var fontSizes = document.getElementsByName("size");
        
        // Change font size of all the text input if a size radio button is checked
        for(var i = 0; i < fontSizes.length; i++) {
            if(fontSizes[i].checked) {
                animationBox.style.fontSize = fontSizes[i].value +"pt";
            }
        }
    }

    // Change reading speed
    function changeSpeed(){
        speedWPM = document.getElementById("speed").value;
        // Handle changing speed in middle of animation
        if(document.getElementById("start").disabled) {
            clearInterval(readingAnimation);
            readingAnimation = setInterval(animation,speedWPM);
        }
    }

    // Display of reading animation
    function animation(){  
        if(currentFrame == wordList.length) {
            clearInterval(readingAnimation);
            currentFrame = 0;
            document.getElementById("stop").disabled = true;
            document.getElementById("start").disabled = false;
            document.getElementById("textBox").disabled = false;
            document.getElementById("animationBox").innerHTML = "";	
        } else {
            document.getElementById("textBox").disabled = true;
            var characters = wordList[currentFrame].split(""); // split word into characters
            var lastCharacter = characters[characters.length - 1];
            var isPunct = lastCharacter.match(/[^a-z]/i);   // array(of length 1) is not null if found punctuation at last character
            
            // Handle punctuations
            if (isPunct !== null && !repeat) {
                var wordWithPunctRemoved = wordList[currentFrame].replace(wordList[currentFrame].charAt(wordList[currentFrame].length - 1), "");
                document.getElementById("animationBox").innerHTML = wordWithPunctRemoved;
                repeat = true;
            } else {
                document.getElementById("animationBox").innerHTML = wordList[currentFrame];
            }
            
            currentFrame++;     // increment to next frame
            
            if (repeat) {
                repeat = false;
            }
        }  
    }
})();