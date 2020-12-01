
var myInput = document.getElementById("password");
var checkInput = document.getElementById("cpassword");
var letter = document.getElementById("characters");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("size");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}
//When the user clicks on the Confirm password field, show the message box
checkInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
  }

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

checkInput.onblur = function() {
    document.getElementById("message").style.display = "none";
  }

// When the user starts to type something inside the password field
myInput.onkeyup = function() {

  // Validate lowercase letters
  var specialCharaters = /[/ * - + ! @ # $ ^ & *]/g;
  if(myInput.value.match(specialCharaters)) {
    characters.classList.remove("invalid");
    characters.classList.add("valid");
  } else {
    characters.classList.remove("valid");
    characters.classList.add("invalid");
    }

  // Validate uppercase letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length >= 8) {
    size.classList.remove("invalid");
    size.classList.add("valid");
  } else {
    size.classList.remove("valid");
    size.classList.add("invalid");
  }
}

// Confirm password 

var check = function() {
    if(document.getElementById('password').value == 
    document.getElementById('cpassword').value){
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
        document.getElementById('submit').disabled = false;
    }else{
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
        document.getElementById('submit').disabled = true;
    }
}
