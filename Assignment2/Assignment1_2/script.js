var quality_check = true;
document.getElementById("register").disabled = true;
/*FOR MATCHING PASSWORDS*/
let pass1 = document.querySelector("#pwd");
let pass2 = document.querySelector("#pwd2");
let result = document.querySelector("#result");

function check_if_matching() {
  if (
    pass1.value == pass2.value &&
    pass1.value.length != 0 &&
    pass2.value.length != 0
  ) {
    result.innerText = "";
  } else if (
    pass1.value != pass2.value &&
    pass1.value.length != 0 &&
    pass2.value.length != 0
  ) {
    result.innerText = "Passwords do not match!";
  }
}

pass1.addEventListener("keyup", check_if_matching);
pass2.addEventListener("keyup", check_if_matching);

/*FOR THE MAKE PASSWORD VISIBLE CHECKBOX*/
document.getElementById("visible").addEventListener("click", seePassword);

function seePassword() {
  const pwd_input = document.getElementById("pwd");
  const type = pwd_input.getAttribute("type");
  if (type == "password") {
    pwd_input.setAttribute("type", "text");
  } else {
    pwd_input.setAttribute("type", "password");
  }
}

/*FOR MAKING SURE THE BANNED WORDS DO NOT EXIST IN PASSWORD */
const banned1 = "helmepa";
const banned2 = "tuc"; //this is a case sensitive function(.includes) so i suppose the only banned words are the ones given in the pd exactly as written
const banned3 = "uoc";

function BannedWords() {
  const word = document.getElementById("pwd").value;
  if (
    word.includes(banned1) ||
    word.includes(banned2) ||
    word.includes(banned3)
  ) {
    document.getElementById("quality").innerText =
      "Bad password : Banned words included in password!";
    document.getElementById("register").disabled = true;
    quality_check = false;
  } else {
    quality_check = true;
    document.getElementById("quality").innerText = "";
  }
}

document.getElementById("pwd").addEventListener("input", BannedWords);

/*PASSWORD STRENGHT*/
document.getElementById("pwd").addEventListener("input", check_strength);

function check_strength() {
  const text = document.getElementById("pwd").value;
  let numbers_in_password = 0;
  let uppercase_letters = 0;
  let lowercase_letters = 0;
  let special_caracters = 0;

  for (var i = 0; i < text.length; i++) {
    if (text[i] <= 9) {
      numbers_in_password++;
    }
  }

  var sectionToCheck = text;
  var specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi;
  var allFoundCharacters = sectionToCheck.match(specialChars);

  uppercase_letters = text.replace(/[^A-Z]/g, "").length;
  lowercase_letters = text.replace(/[^a-z]/g, "").length;

  if (allFoundCharacters != null) special_caracters = allFoundCharacters.length;

  let dummy = 0;
  let dummy2 = 0; //MATH IN JAVASCRIPT BE LIKE
  dummy = text.length;
  dummy2 = dummy / 2;

  if (text.length == 0) {
    document.getElementById("strength").innerText = "";
  } else if (dummy2 <= numbers_in_password) {
    document.getElementById("strength").innerText = "Password strength : Weak";
    document.getElementById("register").disabled = true;
  } else if (
    uppercase_letters >= 1 &&
    lowercase_letters >= 1 &&
    special_caracters >= 2
  ) {
    document.getElementById("strength").innerText =
      "Password strength : Strong";
    if (quality_check) document.getElementById("register").disabled = false;
  } else {
    document.getElementById("strength").innerText =
      "Password strength : Medium";
    if (quality_check) document.getElementById("register").disabled = false;
  }
}

/*For librabry manager options */
function libamn_actions() {
  document.getElementById("typeofStudent").style.display = "none";
  document.getElementById("student_id_number").style.display = "none";
  document.getElementById("student_id_starting_date").style.display = "none";
  document.getElementById("student_id_ending_date").style.display = "none";
  document.getElementById("University").style.display = "none";
  document.getElementById("departement").style.display = "none";

  document.getElementById("address").innerText = " * Library address:";

  var library = document.getElementById("library_name");
  var shedule = document.getElementById("library_schedule");

  library.innerHTML =
    '<label> * <b>Library name:</b></label> \
    <input  type="text" id="libraryname" required="required"/> ';

  shedule.innerHTML =
    '<label> * <b>Information and library schedule :</b></label> <textarea id="library_info" required="required"> </textarea> ';
}

var libman = document.getElementById("lbrn");
libman.addEventListener("click", libamn_actions);

/*For college student  */
function student_onRegister_Validator() {
  var uni_choice = document.getElementById("uniChoice");
  if (uni_choice.value == "UOC") {
    if (!document.getElementById("email").value.endsWith("uoc.gr")) {
      alert("Incorrect email provided!");
      document.getElementById("register").disabled = true;
    }
  } else if (uni_choice.value == "TUC") {
    if (!document.getElementById("email").value.endsWith("tuc.gr")) {
      alert("Incorrect email provided!");
      document.getElementById("register").disabled = true;
    }
  } else {
    if (!document.getElementById("email").value.endsWith("helmepa.gr")) {
      alert("Incorrect email provided!");
      document.getElementById("register").disabled = true;
    }
  }

  var iddateS=document.getElementById('startingdate').value;
  var iddateF=document.getElementById('enddate').value;

  if(iddateF < iddateS){
    alert('Incorrect id date settings provided!')
    document.getElementById("register").disabled = true;
  }
var undrstnt = document.getElementById('under_stdnt');
var poststdnt = document.getElementById('post_stdnt');
var phdstdnt  = document.getElementById('phd_stdnt');

const diffInMs   = new Date(iddateF) - new Date(iddateS)
const diffInDays = diffInMs / (1000 * 60 * 60 * 24);


if(undrstnt.checked && diffInDays> 2192  ){
    alert('Incorrect id date settings.Pre-graduate students have up to 6 years of valid id time');
    document.getElementById("register").disabled = true;
   
}else if(poststdnt.checked && diffInDays> 731){
  alert('Incorrect id date settings.Post-graduate students have up to 2 years of valid id time');
  document.getElementById("register").disabled = true;
}else if(phdstdnt.checked && diffInDays> 1826){
  console.log(diffInDays);  
  alert('Incorrect id date settings.PHD students have up to 5 years of valid id time');
  document.getElementById("register").disabled = true;
}

}

function college_student_actions() {
  document.getElementById("library_name").style.display = "none";
  document.getElementById("library_schedule").style.display = "none";
  document.getElementById("typeofStudent").style.display = "";
  document.getElementById("student_id_number").style.display = "";
  document.getElementById("student_id_starting_date").style.display = "";
  document.getElementById("student_id_ending_date").style.display = "";
  document.getElementById("University").style.display = "";
  document.getElementById("departement").style.display = "";

  document.getElementById("address").innerText = "Home address:";
  document
    .getElementById("register")
    .addEventListener("click", student_onRegister_Validator);
}

var college_student = document.getElementById("stdnt");
college_student.addEventListener("click", college_student_actions);

/*FOR AGREE TERMS AND CONDITIONS */
var checkBox = document.getElementById("agree");
checkBox.addEventListener("click", has_agreed);
function has_agreed() {
  if (checkBox.checked) {
    document.getElementById("agree_message").innerText = "";
    if (quality_check) document.getElementById("register").disabled = false;
  } else {
    document.getElementById("register").disabled = true;
    document.getElementById("agree_message").innerText =
      "You have to read and agree with the Terms and Conditions";
  }
}


/*MAPS  */
/*
const countryInput = document.getElementById('country');
countryInput.value = 'Greece';
const cityInput = document.getElementById('city');
const addressInput = document.getElementById('address');
const addressError = document.getElementById('addressError');
const toggleMap = document.getElementById('toggleMap');
const autofill = document.getElementById('autofill')
const mapContainer = document.getElementById('map');

let lat;
let lon;


function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
  } else { 
      autofill.style.display = 'none';
      autofill.classList.remove('fa-compass');
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + 
  " Longitude: " + position.coords.longitude);
  lat = position.coords.latitude;
  lon = position.coords.longitude;
}

getLocation();

autofill.addEventListener('click', autoAddress);
country.addEventListener('change', findAddress);
city.addEventListener('change', findAddress);
address.addEventListener('change', findAddress);
toggleMap.addEventListener('click', showMap);

function autoAddress() {
  getLocation();
  if(lat == undefined || lon == undefined){
      addressError.style.display = 'block';
      addressError.innerHTML = 'Autofill address Error';
  }

  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
          console.log(this.responseText);
          parser = new DOMParser();
          xmlDoc = parser.parseFromString(this.responseText,"text/xml");
          country.value = xmlDoc.getElementsByTagName("country")[0].childNodes[0].nodeValue;
          city.value = xmlDoc.getElementsByTagName("city")[0].childNodes[0].nodeValue;
          // city.setAttribute('value', xmlDoc.getElementsByTagName("city")[0].childNodes[0].nodeValue);
          let citAdd = xmlDoc.getElementsByTagName("road")[0].childNodes[0].nodeValue + ' ' + xmlDoc.getElementsByTagName("result")[0].getAttribute("address_rank")
          // address.setAttribute('value', citAdd);
          address.value = citAdd;
          console.log(citAdd);
          findAddress();
      }
  });

  xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=" + lat + "&lon=" +lon + "&accept-language=en&format=xml&polygon_threshold=0.0");
  xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "b3696e4eebmsh459a92cc3709e66p14cd8djsnd445f9a9aa9e");
  xhr.send(data);
}

function findAddress(){
  if(countryInput.value === '' || cityInput.value === '' || addressInput.value === ''){
      toggleMap.classList.remove('fa-map-marked-alt');
      toggleMap.style.display = 'none';
      return;
  }
  const address=addressInput.value +" "+ cityInput.value +" "+ countryInput.value; 

  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
          const obj = JSON.parse(xhr.responseText);
          // console.log(obj);
          // console.log(obj.length);
          if(!Array.isArray(obj)) {
              addressError.style.display = 'block';
              addressError.innerHTML = 'Address is not valid';
              toggleMap.classList.remove('fa-map-marked-alt');
              toggleMap.style.display = 'none';
              mapContainer.style.display = 'none';
          }else{
              addressError.style.display = 'none';
              lat = obj[0].lat;
              lon = obj[0].lon;
              toggleMap.style.display = 'inline';
              toggleMap.classList.add('fa-map-marked-alt');
              
              //check if There is a word Crete in the display_name in the JSON object
              if(!obj[0].display_name.includes('Crete')){
                  addressError.style.display = 'block';
                  addressError.innerHTML = 'This service is currently available only in Crete';
              }
          }
      }
  });

  xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q="+address+"&acceptlanguage=en&polygon_threshold=0.0");
  xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "bc81c8bf3cmshb44f5c426aef2abp166159jsnb0891c1cc857");
  xhr.send(data);
}



function isVisible(e) {
  return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
}

let map;
let markers;

function showMap(){
  //check if mapContainer is visible
  if(isVisible(mapContainer)){
      mapContainer.style.display = 'none';
      return;
  }
  mapContainer.style.display = 'block';
  //Orismos Marker
  // check if map is already created
  console.log(map);
  if(!map){
      map = new OpenLayers.Map("map");
      let mapnik = new OpenLayers.Layer.OSM();
      map.addLayer(mapnik);
      //Markers	
      markers = new OpenLayers.Layer.Markers( "Markers" );
      map.addLayer(markers);
  }

  //Orismos Thesis
function setPosition(lat, lon){
  var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
  var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
  var position       = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection);
  return position;
}
  //Protos Marker	
var position=setPosition(lat,lon);
var mar=new OpenLayers.Marker(position);
  markers.clearMarkers();
markers.addMarker(mar);	


  //Orismos zoom	
const zoom = 10;
  map.setCenter(position, zoom);
}
*/