var slider1 = document.getElementById("volume");
var output1 = document.getElementById("volumeOutput");
var vol = slider1.value;

var slider2 = document.getElementById("elevation");
var output2 = document.getElementById("elevationOutput");

var result = document.getElementById("result").querySelector("p");

console.log(slider1);
console.log(vol);

function updateResult(slider1, slider2) {
    var calculation = Number(slider1) * 0.85 * 9.8 * Number(slider2) * 0.894427191 * 0.000277777778; // Replace with your calculation
    result.textContent = calculation.toFixed(2);
}

window.onload = function() {
    var slider1 = document.getElementById("volume");
    var output1 = document.getElementById("volumeOutput");
    var vol = slider1.value;
    
    var slider2 = document.getElementById("elevation");
    var output2 = document.getElementById("elevationOutput");
    
    var result = document.getElementById("result").querySelector("p");
    
    console.log(slider1);
    console.log(vol);
  output1.innerHTML = slider1.value; // Display the default slider value

  
  output2.innerHTML = slider2.value; // Display the default slider value

  

  // Update the current slider value (each time you drag the slider handle)
  slider1.oninput = function() {
      output1.innerHTML = this.value;
      updateResult(slider1.value,slider2.value);
  }

  slider2.oninput = function() {
      output2.innerHTML = this.value;
      updateResult(slider1.value,slider2.value);
  }
}

// Select the range input
var range = document.querySelector('#volume');

// Listen for changes to the input's value
range.addEventListener('input', function() {
  // Calculate the percentage of the current value
  var percent = (this.value - this.min) / (this.max - this.min) * 100;

  // Update the background of the input
  this.style.background = `linear-gradient(to right, teal 0%, teal ${percent}%, #ccc ${percent}%, #ccc 100%)`;
});

// Trigger the input event to set the initial background
range.dispatchEvent(new Event('input'));


// Select the range input
var range = document.querySelector('#elevation');

// Listen for changes to the input's value
range.addEventListener('input', function() {
  // Calculate the percentage of the current value
  var percent = (this.value - this.min) / (this.max - this.min) * 100;

  // Update the background of the input
  this.style.background = `linear-gradient(to right, orange 0%, orange ${percent}%, #ccc ${percent}%, #ccc 100%)`;
});

// Trigger the input event to set the initial background
range.dispatchEvent(new Event('input'));

//Display the form to enter coordinates when clicking the button
document.getElementById('gps').addEventListener('click', function() {
  this.style.display = 'none';
  document.getElementById('coordForm').style.display = 'block';
});

// Handle form submission for coordinate-based elevation change calculation
document.getElementById('coordForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var lat1 = parseFloat(document.getElementById('latitude1').value);
  var lon1 = parseFloat(document.getElementById('longitude1').value);
  var lat2 = parseFloat(document.getElementById('latitude2').value);
  var lon2 = parseFloat(document.getElementById('longitude2').value);

  calculateElevationChange(lat1, lon1, lat2, lon2);
});

function calculateElevationChange(lat1, lon1, lat2, lon2, vol) {
  // Check distance between points
  var distance = haversine(lat1, lon1, lat2, lon2);
  console.log(vol);
  
      // Fetch elevations for the two points
      Promise.all([
          getElevation(lat1, lon1),
          getElevation(lat2, lon2)
      ]).then(function(elevations) {
          if (elevations[0] !== null && elevations[1] !== null) {
              var elevationDiff = Math.abs(elevations[1] - elevations[0]);
              output2.innerHTML = elevationDiff; // Update elevation change display
              //slider2.value = elevationDiff; // Set slider to elevation difference
              updateResult(vol,elevationDiff); // Recalculate result with updated elevation difference
          } else {
              alert('Unable to retrieve elevation data.');
          }
      });
  } 



function haversine(lat1, lon1, lat2, lon2) {
  var R = 6371000; // Radius of the Earth in meters
  var rad = Math.PI / 180; // Convert degrees to radians
  var dlat = (lat2 - lat1) * rad;
  var dlon = (lon2 - lon1) * rad;
  var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
          Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
          Math.sin(dlon / 2) * Math.sin(dlon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getElevation(lat, lon) {
  return fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`)
      .then(response => response.json())
      .then(data => {
          if ('results' in data) {
              return data.results[0].elevation;
          } else {
              return null;
          }
      });
}

// Get the reset button
var resetButton = document.getElementById('reset');

// Get the "Enter Coordinates" button and the form
var gpsButton = document.getElementById('gps');
var coordForm = document.getElementById('coordForm');

// Assign the function to the onclick property
// Assign the function to the onclick property
resetButton.onclick = function() {
    // Reset the slider values
    slider1.value = 5; // Replace with your default value
    slider2.value = 500; // Replace with your default value

    // Update the slider positions
    slider1.dispatchEvent(new Event('input'));
    slider2.dispatchEvent(new Event('input'));

    // Update the output elements
    output1.innerHTML = slider1.value;
    output2.innerHTML = slider2.value;

    // Clear the result
    result.textContent = '.';

    // Reset the form
    coordForm.reset();

    // Hide the form and show the "Enter Coordinates" button
    coordForm.style.display = 'none';
    gpsButton.style.display = 'block';
}

function updateResult() {
    var calculation = Number(slider1.value) * 0.85 * 9.8 * Number(slider2.value) * 0.894427191 * 0.277777778 /1000; // Replace with your calculation
    result.textContent = calculation.toFixed(2);

    // Get the result div
    var resultDiv = document.getElementById('result');

    // Change the background image based on the result
    if (calculation > 73.75) {
        resultDiv.style.backgroundImage = "url('city.jpg')"; // Replace with your image URL
    } else if (calculation > 0.0725) {
        resultDiv.style.backgroundImage = "url('town.jpg')"; // Replace with your image URL
    } else {
        resultDiv.style.backgroundImage = "url('house.jpg')"; // Replace with your image URL
    }
}