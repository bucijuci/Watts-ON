window.onload = function() {
  var slider1 = document.getElementById("volume");
  var output1 = document.getElementById("volumeOutput");
  output1.innerHTML = slider1.value; // Display the default slider value

  var slider2 = document.getElementById("elevation");
  var output2 = document.getElementById("elevationOutput");
  output2.innerHTML = slider2.value; // Display the default slider value

  var result = document.getElementById("result").querySelector("p");

  // Update the current slider value (each time you drag the slider handle)
  slider1.oninput = function() {
      output1.innerHTML = this.value;
      updateResult(slider1.value,slider2.value);
  }

  slider2.oninput = function() {
      output2.innerHTML = this.value;
      updateResult(slider1.value,slider2.value);
  }

  function updateResult(slider1, slider2) {
      var calculation = Number(slider1) * 0.85 * 9.8 * Number(slider2) * 0.894427191 * 0.277777778 /1000; // Replace with your calculation
      result.textContent = calculation.toFixed(2);
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

function calculateElevationChange(lat1, lon1, lat2, lon2,slider1.value,slider2.value) {
  // Check distance between points
  var distance = haversine(lat1, lon1, lat2, lon2);
  
  if (distance < 600) {
      // Fetch elevations for the two points
      Promise.all([
          getElevation(lat1, lon1),
          getElevation(lat2, lon2)
      ]).then(function(elevations) {
          if (elevations[0] !== null && elevations[1] !== null) {
              var elevationDiff = Math.abs(elevations[1] - elevations[0]);
              // output2.innerHTML = elevationDiff; // Update elevation change display
              // slider2.value = elevationDiff; // Set slider to elevation difference
              updateResult(slider1.value,elevationDiff); // Recalculate result with updated elevation difference
          } else {
              alert('Unable to retrieve elevation data.');
          }
      });
  } else {
      alert('Points are more than 600 meters apart.');
  }
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

// Get the form
var coordForm = document.getElementById('coordForm');

// Add an event listener for the submit event
coordForm.addEventListener('submit', function(event) {
    // Prevent the form from being submitted
    event.preventDefault();

    // Get the latitude and longitude from the form
    var lat = document.getElementById('lat').value;
    var lon = document.getElementById('lon').value;

    // Get the elevation
    getElevation(lat, lon)
        .then(elevation => {
            // Display the elevation
            console.log('Elevation:', elevation);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
});
