window.onload = function() {
  var slider1 = document.getElementById("mass");
  var output1 = document.getElementById("massOutput");
  output1.innerHTML = slider1.value; // Display the default slider value

  var slider2 = document.getElementById("elevation");
  var output2 = document.getElementById("elevationOutput");
  output2.innerHTML = slider2.value; // Display the default slider value

  var result = document.getElementById("result").querySelector("p");

  // Update the current slider value (each time you drag the slider handle)
  slider1.oninput = function() {
      output1.innerHTML = this.value;
      updateResult();
  }

  slider2.oninput = function() {
      output2.innerHTML = this.value;
      updateResult();
  }

  function updateResult() {
      var calculation = Number(slider1.value) * 0.85 * 9.8 * Number(slider2.value) * 0.894427191 * 0.277777778 /1000; // Replace with your calculation
      result.textContent = calculation.toFixed(2);
  }
}

// Select the range input
var range = document.querySelector('#mass');

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

// Get the slider and the p element
var result = document.getElementById("result").querySelector("p");

// Update the result when the slider value changes
slider.oninput = function() {
    var calculation = this.value * 2; // Replace with your calculation
    result.textContent = calculation;
}

document.getElementById('reset').addEventListener('click', function() {
  // Reset the slider values
  slider1.value = 5; // Replace with your default value
  slider2.value = 500; // Replace with your default value

  // Update the output elements
  output1.innerHTML = slider1.value;
  output2.innerHTML = slider2.value;

  // Clear the result
  result.textContent = '.';
});