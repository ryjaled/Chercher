var geocoder;
var map;
var markers = Array();
var infos = Array();
var value="";
var values="";
var lat;
var long;
var resultArray = Array();


$(document).ready(
 function() {
  $(".btn-atm").click(function() {

   $(".atmorder").fadeToggle();
  });
 }
);

function myLocation() {

navigator.geolocation.getCurrentPosition(onSuccess, onError);

}


var onSuccess = function(position) {


      lat = position.coords.latitude;
      long = position.coords.longitude;

      initialize();

    };



    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }




function initialize() {

// prepare Geocoder
geocoder = new google.maps.Geocoder();
// set initial position (New York)
// 5.760073,-0.221880
var myLatlng = new google.maps.LatLng(lat,long);
var myOptions = { // default map options
zoom: 12,
center: myLatlng,
scrollwheel: false,
mapTypeId: google.maps.MapTypeId.ROADMAP

};


map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

var marker = new google.maps.Marker({
  position: myLatlng,
  map: map,
  // animation: google.maps.Animation.BOUNCE
 });
 marker.setMap(map);


}
// clear overlays function
function clearOverlays() {
if (markers) {
for (i in markers) {
markers[i].setMap(null);
}
markers = [];
infos = [];
}
}
// clear infos function
function clearInfos() {
if (infos) {
for (i in infos) {
if (infos[i].getMap()) {
infos[i].close();
}
}
}
}

// find address function
function findAddress() {

  // google.maps.event.addDomListener(window, 'load', initialize);
  initialize();

var address = document.getElementById("search").value;
var autocomplete = new google.maps.places.Autocomplete(address);
// script uses our 'geocoder' in order to find location by address name
geocoder.geocode( { 'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) { // and, if everything is ok
// we will center map
var addrLocation = results[0].geometry.location;
map.setCenter(addrLocation);
// store current coordinates into hidden variables
document.getElementById('lat').value = results[0].geometry.location.lat();
document.getElementById('lng').value = results[0].geometry.location.lng();
// and then - add new custom marker
var addrMarker = new google.maps.Marker({
position: addrLocation,
map: map,
title: results[0].formatted_address
// icon: 'marker.png'
});
} else {
// alert('Geocode was not successful for the following reason: ' + status);
}
});
}



// find custom places function
function findATM() {
// prepare variables (filter)
var type = "atm";
console.log(type);
var radius = 5000;
// var keyword = document.getElementById('gmap_keyword').value;
var lat = document.getElementById('lat').value;
var lng = document.getElementById('lng').value;
var cur_location = new google.maps.LatLng(lat, lng);
// prepare request to Places
var request = {
location: cur_location,
radius: radius,
types: [type]
};
// if (keyword) {
// request.keyword = [keyword];
// }
// send request
console.log(map);
service = new google.maps.places.PlacesService(map);
service.search(request, createMarkersATM);
}

function findBank() {
// prepare variables (filter)
var type = "bank";
console.log(type);
var radius = 5000;
// var keyword = document.getElementById('gmap_keyword').value;
var lat = document.getElementById('lat').value;
var lng = document.getElementById('lng').value;
var cur_location = new google.maps.LatLng(lat, lng);
// prepare request to Places
var request = {
location: cur_location,
radius: radius,
types: [type]
};
// if (keyword) {
// request.keyword = [keyword];
// }
// send request
console.log(map);
service = new google.maps.places.PlacesService(map);
service.search(request, createMarkers);
}


function findBar() {
// prepare variables (filter)
var type = "bar";
console.log(type);
var radius = 5000;
// var keyword = document.getElementById('gmap_keyword').value;
var lat = document.getElementById('lat').value;
var lng = document.getElementById('lng').value;
var cur_location = new google.maps.LatLng(lat, lng);
// prepare request to Places
var request = {
location: cur_location,
radius: radius,
types: [type]
};
// if (keyword) {
// request.keyword = [keyword];
// }
// send request
console.log(map);
service = new google.maps.places.PlacesService(map);
service.search(request, createMarkers);
}


function findFood() {
// prepare variables (filter)
var type = "food";
console.log(type);
var radius = 5000;
// var keyword = document.getElementById('gmap_keyword').value;
var lat = document.getElementById('lat').value;
var lng = document.getElementById('lng').value;
var cur_location = new google.maps.LatLng(lat, lng);
// prepare request to Places
var request = {
location: cur_location,
radius: radius,
types: [type]
};
// if (keyword) {
// request.keyword = [keyword];
// }
// send request
console.log(map);
service = new google.maps.places.PlacesService(map);
service.search(request, createMarkers);
}


function findHospital() {
// prepare variables (filter)
var type = "hospital";
console.log(type);
var radius = 5000;
// var keyword = document.getElementById('gmap_keyword').value;
var lat = document.getElementById('lat').value;
var lng = document.getElementById('lng').value;
var cur_location = new google.maps.LatLng(lat, lng);
// prepare request to Places
var request = {
location: cur_location,
radius: radius,
types: [type]
};
// if (keyword) {
// request.keyword = [keyword];
// }
// send request
console.log(map);
service = new google.maps.places.PlacesService(map);
service.search(request, createMarkers);
}


function findHotel() {
// prepare variables (filter)
var type = "lodging";
console.log(type);
var radius = 5000;
// var keyword = document.getElementById('gmap_keyword').value;
var lat = document.getElementById('lat').value;
var lng = document.getElementById('lng').value;
var cur_location = new google.maps.LatLng(lat, lng);
// prepare request to Places
var request = {
location: cur_location,
radius: radius,
types: [type]
};
// if (keyword) {
// request.keyword = [keyword];
// }
// send request
console.log(map);
service = new google.maps.places.PlacesService(map);
service.search(request, createMarkersHotel);
}

function findPolice() {
// prepare variables (filter)
var type = "police";
console.log(type);
var radius = 5000;
// var keyword = document.getElementById('gmap_keyword').value;
var lat = document.getElementById('lat').value;
var lng = document.getElementById('lng').value;
var cur_location = new google.maps.LatLng(lat, lng);
// prepare request to Places
var request = {
location: cur_location,
radius: radius,
types: [type]
};
// if (keyword) {
// request.keyword = [keyword];
// }
// send request
console.log(map);
service = new google.maps.places.PlacesService(map);
service.search(request, createMarkers);
}

function findUniversity() {
// prepare variables (filter)
var type = "university";
console.log(type);
var radius = 15000;
// var keyword = document.getElementById('gmap_keyword').value;
var lat = document.getElementById('lat').value;
var lng = document.getElementById('lng').value;
var cur_location = new google.maps.LatLng(lat, lng);
// prepare request to Places
var request = {
location: cur_location,
radius: radius,
types: [type]
};
// if (keyword) {
// request.keyword = [keyword];
// }
// send request
console.log(map);
service = new google.maps.places.PlacesService(map);
service.search(request, createMarkers);
}


function directory(results)
{
  var value="";
  console.log("im here");
  console.log(results);

  for (var i = 0; i < results.length; i++) {

    value=value+"<p><img src="+results[i].icon+" alt='' class='square' width=40 height=40><br><span class='title blue-text text-lighten-2'>"+results[i].name+"</span><br>Location: "+results[i].vicinity+"<br>Rating: "+results[i].rating+"</p>";

  }
  document.getElementById('list1').innerHTML = "";
  document.getElementById('list').innerHTML = value;

}


function directoryHotel(results)
{
  var value="";
  buttonValue = "<button id = \"btn-atm\" class=\"btn waves-effect col s12 blue darken-4\" onclick=addBook()>Make A Booking</button>";
  console.log("im here");
  console.log(results);

  for (var i = 0; i < results.length; i++) {

    value=value+"<p><img src="+results[i].icon+" alt='' class='square' width=40 height=40><br><span class='title blue-text text-lighten-2'>"+results[i].name+"</span><br>Location: "+results[i].vicinity+"<br>Rating: "+results[i].rating+"<br></p>";

  }

  document.getElementById('list1').innerHTML = buttonValue;
  document.getElementById('list').innerHTML = value;

}


function directoryATM(results)
{
  var value="";
  console.log("im here");
  console.log(results);

  buttonValue = "<button id = \"btn-atm\" class=\"btn waves-effect col s12 blue darken-4\" onclick=requestCard()>Request Card</button>";

  for (var i = 0; i < results.length; i++) {

    value=value+"<p><img src="+results[i].icon+" alt='' class='square' width=40 height=40><br><span class='title blue-text text-lighten-2'>"+results[i].name+"</span><br>Location: "+results[i].vicinity+"<br>Rating: "+results[i].rating+"<br></p>";
    resultArray = results;

  }

  document.getElementById('list1').innerHTML = buttonValue;
  document.getElementById('list').innerHTML = value;

}



// create markers (from 'findPlaces' function)
function createMarkers(results, status) {

  directory(results);




if (status == google.maps.places.PlacesServiceStatus.OK) {
// if we have found something - clear map (overlays)
clearOverlays();
// and create new markers by search result
for (var i = 0; i < results.length; i++) {

createMarker(results[i]);
// $("#list").append( "< text</");
// document.getElementById("list").innerHTML = "some text";
// value=value+"<p><img src="+results[i].icon+" alt='' class='circle'><span class='title red-text text-lighten-2'>"+results[i].name+"</span>Location: "+results[i].vicinity+"</p>";
}
// $("#list").append( "< text</");
// document.getElementById("list").innerHTML = "some text";

}
// document.getElementById("list").innerHTML = "some text";
// $("#list").append( "< text</");
// document.getElementById('list').innerHTML = "some text";

}


// creare single marker function
function createMarker(obj) {
// prepare new Marker object
var mark = new google.maps.Marker({
position: obj.geometry.location,
map: map,
title: obj.name,
animation: google.maps.Animation.BOUNCE
});
markers.push(mark);
// prepare info window
var infowindow = new google.maps.InfoWindow({

content: '<div><img src="' + obj.icon + '" heigh=30 width=30/><br>' + obj.name +
'<br>Rating: ' + obj.rating + '<br>Vicinity: ' + obj.vicinity + '</div>'
});
// add event handler to current marker
google.maps.event.addListener(mark, 'click', function() {
clearInfos();
infowindow.open(map,mark);
});
infos.push(infowindow);
}






// create markers (from 'findPlaces' function)
function createMarkersHotel(results, status) {

  directoryHotel(results);


if (status == google.maps.places.PlacesServiceStatus.OK) {
// if we have found something - clear map (overlays)
clearOverlays();
// and create new markers by search result
for (var i = 0; i < results.length; i++) {

createMarkerHotel(results[i]);
// $("#list").append( "< text</");
// document.getElementById("list").innerHTML = "some text";
// value=value+"<p><img src="+results[i].icon+" alt='' class='circle'><span class='title red-text text-lighten-2'>"+results[i].name+"</span>Location: "+results[i].vicinity+"</p>";
}
// $("#list").append( "< text</");
// document.getElementById("list").innerHTML = "some text";

}
// document.getElementById("list").innerHTML = "some text";
// $("#list").append( "< text</");
// document.getElementById('list').innerHTML = "some text";

}

//
// creare single marker function
function createMarkerHotel(obj) {
// prepare new Marker object
var mark = new google.maps.Marker({
position: obj.geometry.location,
map: map,
title: obj.name,
animation: google.maps.Animation.BOUNCE
});
markers.push(mark);
// prepare info window
var infowindow = new google.maps.InfoWindow({

content: '<div><img src="' + obj.icon + '" heigh=30 width=30/><br>' + obj.name +
'<br>Rating: ' + obj.rating + '<br>Vicinity: ' + obj.vicinity + '</div>'
});
// add event handler to current marker
google.maps.event.addListener(mark, 'click', function() {
clearInfos();
infowindow.open(map,mark);
});
infos.push(infowindow);
}








// create markers (from 'findPlaces' function)
function createMarkersATM(results, status) {

  directoryATM(results);


if (status == google.maps.places.PlacesServiceStatus.OK) {
// if we have found something - clear map (overlays)
clearOverlays();
// and create new markers by search result
for (var i = 0; i < results.length; i++) {

createMarkerATM(results[i]);
// $("#list").append( "< text</");
// document.getElementById("list").innerHTML = "some text";
// value=value+"<p><img src="+results[i].icon+" alt='' class='circle'><span class='title red-text text-lighten-2'>"+results[i].name+"</span>Location: "+results[i].vicinity+"</p>";
}
// $("#list").append( "< text</");
// document.getElementById("list").innerHTML = "some text";

}
// document.getElementById("list").innerHTML = "some text";
// $("#list").append( "< text</");
// document.getElementById('list').innerHTML = "some text";

}

//
// creare single marker function
function createMarkerATM(obj) {
// prepare new Marker object
var mark = new google.maps.Marker({
position: obj.geometry.location,
map: map,
title: obj.name,
animation: google.maps.Animation.BOUNCE
});
markers.push(mark);
// prepare info window
var infowindow = new google.maps.InfoWindow({

content: '<div><img src="' + obj.icon + '" heigh=30 width=30 /><br>' + obj.name +
'<br>Rating: ' + obj.rating + '<br>Vicinity: ' + obj.vicinity + '</div>'
});
// add event handler to current marker
google.maps.event.addListener(mark, 'click', function() {
clearInfos();
infowindow.open(map,mark);
});
infos.push(infowindow);
}








// initialization
google.maps.event.addDomListener(window, 'load', myLocation);


$(document).ready(function(){
   $('.collapsible').collapsible();

 });

 $(document).ready(function(){
      $('.carousel').carousel();
    });

    $(document).ready(function(){
      $('ul.tabs').tabs();
    });







































































var currentObject = null;
var userID;
var array = [];
// var objArray;

//Displays email alert message

function addBook() {


    var input = prompt("Hello,\nDear "+sessionStorage.username+",\n\nPlease enter your password to confirm booking request:")

    if(input == sessionStorage.password){
      alert("Great!\nNow that we are sure its you, we'll forward you to the booking screen!");

      window.location="#bookingpage";

    } else{
      alert("fail");
    }

}



function addBookingComplete(xhr,status){
console.log(xhr.responseText);
window.location="#mapPage";
}


function addBooking()
{


  //  alert("Welcome To Chercher signup!");
    var hotelname = $("#hotelname").val();
    var occupants = $("#occupants").val();
    var checkindate = $("#checkindate").val();
    var checkoutdate = $("#checkoutdate").val();
    // var telephone = $("#telephone").val();

    // alert(telephone);
    // alert(telephone);


    var theUrl="http://52.89.116.249/~ryan.moujaled/Chercher/frameajax.php?cmd=10&hotelname="+hotelname+
    "&occupants="+occupants+"&checkindate="+checkindate+"&checkoutdate="
    +checkoutdate;


    $.ajax(theUrl,
      {async:true,
        complete:addBookingComplete});

}



function sendContactComplete(xhr,status){
console.log(xhr.responseText);
}



function sendContact()
{
  alert("Mesage sent successfully!");
  var username = sessionStorage.username
  // var name = $("#name").val();
  var messagearea = $("#messagearea").val();

  var theUrl="http://52.89.116.249/~ryan.moujaled/Chercher/frameajax.php?cmd=11&messagearea="+messagearea+"&username="+username;

  $.ajax(theUrl,{
    async:true,
    complete:submitAdminCardRequestComplete
  });

}

function requestCard() {


  var input = prompt("Hello,\nDear "+sessionStorage.username+",\nThank you for sending in your request for a new ATM card.\n"+sessionStorage.bank +" would reach out to you when your card is ready for pick-up!\nPlease enter your password to verify your request")

  if(input == sessionStorage.password){
    alert("Thank you.\n Your request would be processed soon and you will be contacted.");

    //request code

  } else{
    alert("fail");
  }

  //function to store card request in data base for admin page
    submitAdminCardRequest(sessionStorage.username, sessionStorage.bank);
}

function submitAdminCardRequestComplete(xhr,status){
console.log(xhr.responseText);
}

function submitAdminCardRequest(username, bank)
{
  console.log(username);
  console.log(bank);
  var theUrl="http://52.89.116.249/~ryan.moujaled/Chercher/frameajax.php?cmd=9&username="+username+"&bank="+bank;

  $.ajax(theUrl,{
    async:true,
    complete:submitAdminCardRequestComplete
  });

}

function getFirstWord(str) {
        if (str.indexOf(' ') === -1)
            return str;
        else
            return str.substr(1, str.indexOf(' '));
    };

    function getWords(str) {
    return str.split(/\s+/).slice(0,2).join(" ");
}



function email(){
  alert("An email has been sent to the admin to reset your password");
}

/**
*@param server response, status
*Redirects to the home page after login
**/
function LoginComplete(xhr,status){
  console.log(xhr.responseText);
console.log("here1");
  var obj = JSON.parse(xhr.responseText);
  console.log(obj);
  console.log("here2");

  if(obj.result==1){
    console.log(obj.result);
    console.log(obj.username);
    sessionStorage.username=obj.username;
    sessionStorage.password=obj.password;
    sessionStorage.bank=obj.bank;
    // sessionStorage.id=obj.username;
    console.log(sessionStorage.username);
    console.log(sessionStorage.password);

    window.location="#landingPage";
  }
  else{

      alert(obj.message);
    }

}

//Passes the users information to be logged in
function LoginUser(){
  var username=$("#Username").val();
  var password=$("#Password").val();
  var theUrl="http://52.89.116.249/~ryan.moujaled/Chercher/frameajax.php?cmd=6&username="+username+"&password="+password;
//  prompt("url", theUrl);
  $.ajax(theUrl,{
    async:true,
    complete:LoginComplete
  });
}





function AdminLoginComplete(xhr,status){



    window.location="#adminlandingPage";


}

//Passes the users information to be logged in
function AdminLoginUser(){
  var username=$("#Username").val();
  var password=$("#Password").val();
 var theUrl="http://52.89.116.249/~ryan.moujaled/Chercher/frameajax.php?cmd=12&username="+username+"&password="+password;
 // prompt("url", theUrl);
  $.ajax(theUrl,{
    async:true,
    complete:AdminLoginComplete
  });
}





/**
*Displays message concerning whether user
* was added or not
**/
function addUserComplete(xhr,status){
console.log(xhr.responseText);
// var obj = $.parseJSON(xhr.responseText);
    // if(obj.result==1){
    // userID=obj.userID;

    alert("Welcome To Chercher!");
    /*Fields emptied after adding User*/

    $("#firstname").val("");
    $("#lastname").val("");
    $("#username").val("");
    $("#password").val("");
    $("#email").val("");
    $("#organization").val("");
    $("#telephone").val("");
    $("#creditcard").val("");
    $("#bank").val("");
    window.location="index.html";
    // }
    // else{
    // alert(obj.message);
    // }

}

/**
*Allows the admin to add users
**/
function addUser(){
//  alert("Welcome To Chercher signup!");
  var firstname = $("#firstname").val();
  var lastname = $("#lastname").val();
  var username=$("#username").val();
  var password=$("#password").val();
  var email=$("#email").val();
  var organization=$("#organization").val();
  var bank = $("#bank").val();
  var creditcard = $("#creditcard").val();
  var telephone = $("#telephone").val();


  var theUrl="http://52.89.116.249/~ryan.moujaled/Chercher/frameajax.php?cmd=5&firstname="+firstname+
  "&lastname="+lastname+"&username="+username+"&password="
  +password+"&email="+email+"&organization="+organization+"&bank="+bank+"&creditcard="+creditcard+"&telephone="+telephone;

  window.location="index.html";
  $.ajax(theUrl,
    {async:true,
      complete:addUserComplete	});
}




function getBooksComplete(xhr,status){
  // console.log(xhr.responseText);
  var obj = $.parseJSON(xhr.responseText);
  console.log(obj);

//
//
if(obj!=null){
  // window.location="join_pool.html";
  console.log("here");
  // $('#bookingcontent').html("test");

  values = values+"<table style = 'font-size: small' class='stripped card-content'><thead><tr><th>Hotel</th><th>Check-in</th><th>Check-out</th><th>Occupants</th>"
    for (var i = 0; i < obj.length; i++)
    {

      // value=value+"<p>"+obj[i].HOTELNAME+""+obj[i].CHECKIN+""+obj[i].CHECKOUT+""+obj[i].CHECKIN+""+obj[i].OCCUPANTS"</p>";
      // value=value+"<p>"+obj[i].HOTELNAME+"</p>"+"<p>"+obj[i].CHECKIN+"</p>"+"<p>"+obj[i].CHECKOUT+"</p>"+"<p>"+obj[i].OCCUPANTS+"</p>";

      values=values+"</tr></thead><tbody><tr><td>"+obj[i].HOTELNAME+"</td><td>"+obj[i].CHECKIN+"</td><td>"+obj[i].CHECKOUT+"</td><td>"+obj[i].OCCUPANTS+"</td></tr>";
      // values=values="<table class='stripped'><thead><tr><th data-field='id'>Name</th><th data-field='name'>Item Name</th><th data-field='price'>Item Price</th></tr></thead><tbody><tr><td>"+obj[i].HOTELNAME+"</td><td>"+obj[i].CHECKIN+"</td><td>"+obj[i].CHECKOUT+"</td></tr></tbody></table>";
      // va
      console.log(values);
      // objArray = {poolid:obj[i].POOL_ID, userid:obj[i].USER_ID};
      // array.push(objArray);
      // console.log(objArray);
      // console.log(array);

      // $('#bookingcontent').append("<a href='#'id='"+i+"' class='pools'>"+
      //                                           "<div style='font-size: 90%;' class='row'>"+
      //                                           "<div class='col s12 m6'>"+
      //                                           "<div class='card black'>"+
      //                                           "<div class='card-content orange-text'>"+
      //                                           "<span><u>Destination</u>: "+obj[i].CHECKIN+"</span>"+"<span style='padding-left: 3%;'><u>Departure time: </u>"+obj[i].CHECKOUT+"</span>"+
      //                                           "<p><u>Unique Pool ID</u>: "+obj[i].HOTELNAME+"</p>"+
      //                                           "<span><u>Name of Pool Creator</u>: "+obj[i].OCCUPANTS+
      //                                           "<p><u>Pool Name</u>: "+obj[i].POOL_NAME+"</p>"+
      //                                           "</div>"+
      //                                           "</div>"+
      //                                           "</div>"+
      //                                           "</div>"+
      //                                           "</a>");

    }
    values = values + "</tbody></table>";
    document.getElementById('bookingcontent').innerHTML = values;


  }
}
    //
  //   $(".pools").click(function() {
  //
  //   // isFull();
  //   var confirm = prompt("Y or N to confirm.");
  //
  //
  //   if (confirm != null) {
  //  joinPool($(".pools").attr("id"));
  //   }
  //   else {
  // alert("Error executing instruction");
  //     }
  //    });


// }






function getReportComplete(xhr,status){
  console.log(xhr.responseText);
  var obj = JSON.parse(xhr.responseText);

  if(obj!=null){
    // window.location="join_pool.html";
    $('.displayreports').html("");

    for (var i = 0; i < obj.length; i++)
    {
      $('.displayreport').append("<a href='#'id='"+i+"' class='pools'>"+
                                                "<div style='font-size: 90%;' class='row'>"+
                                                "<div class='col s12 m6'>"+
                                                "<div class='card black'>"+
                                                "<div class='card-content orange-text'>"+
                                                +"<span>"+obj[i].DATE_CREATED+"</span><br>"+
                                                "<span><u>Your Pool ID's</u>: "+obj[i].POOL_ID+"<br></span>"+"<span style='padding-left: 0%;'><u>Names of your pool</u>: "+obj[i].POOL_NAME+"<br></span>"+
                                                "<p><u>Max Capacity: </u>: "+obj[i].MAX_CAPACITY+"<br></p>"+
                                                "<span><u>Your desintation was/is: </u>: "+obj[i].POOL_DESTINATION+"<br></span>"+"<span><u>Your departure time was/is</u>: "+obj[i].POOL_DEPARTURE+"<br></span>"+
                                                "</div>"+
                                                "</div>"+
                                                "</div>"+
                                                "</div>"+
                                                "</a>");

    }


}
}





function getReport(){
    var i = sessionStorage.id;
    var theUrl="frameajax.php?cmd=7&id="+i;

    $.ajax(theUrl,
      {async:true,
        complete:getReportComplete});

}



function getBooks(){
    // var i = sessionStorage.id;
    var theUrl="http://52.89.116.249/~ryan.moujaled/Chercher/frameajax.php?cmd=2";

    $.ajax(theUrl,
      {async:true,
        complete:getBooksComplete});

}




function getRequestsComplete(xhr,status){
  // console.log(xhr.responseText);
  var obj = $.parseJSON(xhr.responseText);
  console.log(obj);

//
//
if(obj!=null){

  // console.log("here");

  values = values+"<table style = 'font-size: small' class='stripped card-content'><thead><tr><th>Date</th><th>Username</th><th>Bank</th>";
    for (var i = 0; i < obj.length; i++)
    {



      values=values+"</tr></thead><tbody><tr><td>"+obj[i].DATE+"</td><td>"+obj[i].USERNAME+"</td><td>"+obj[i].BANK+"</td></tr>";

      // console.log(values);


    }
    values = values + "</tbody></table>";
    document.getElementById('cardcontent').innerHTML = values;


  }
}


function getRequests(){
    // var i = sessionStorage.id;
    var theUrl="http://52.89.116.249/~ryan.moujaled/Chercher/frameajax.php?cmd=3";

    $.ajax(theUrl,
      {async:true,
        complete:getRequestsComplete});

}




function getNews(){

    var theUrl="frameajax.php?cmd=8";
alert("here");
    $.ajax(theUrl,
      {async:true,
        complete:getNewsComplete});

}






//Tool tip for editing information
$(function() {
  $('.content').hover(function() {
    $('#edit_info').css('display', 'block');
  }, function() {
    $('#edit_info').css('display', 'none');
  });
});
