/* Global Variables */
let logCount = 0;
let feelingUI = "";

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
let newDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} `;

// Personal API Key for OpenWeatherMap API
const apiKey = `42b8991393801a8662037ddb8fbd3c5f`;
// const locationID = `2950061`;
// const countryCode = "ch";
const unit = `metric`;

// Event listener to add function to existing HTML DOM element
const el = document.getElementById("generate");
console.log(`Add Event Listener to -> `, el);
el.addEventListener("click", getStarted);

/* Function called by event listener */
function getStarted() {
  console.log("Generate Button Clicked");
  getWeatherData(unit, apiKey)
    .then(function(data) {
      console.log("postDatat to /all endpoint ->", data);
      postData("/all", {
        Location: data.name,
        Date: newDate,
        Temp: data.main.temp,
        Content: feelingUI
      });
    })
    .then(data => updateUI());
}

/* Function to GET Web API Data*/
const getWeatherData = async (unit, apiKey) => {
  try {
    let zipCode = document.getElementById("zip").value;
    console.log("getWeatherData - Get Elements by ID - zipCode", zipCode);

    let countryCode = document.getElementById("cc").value;
    console.log("getWeatherData - Get Elements by ID - CC", countryCode);

    feelingUI = document.getElementById("feelings").value;
    console.log("getWeatherData - Get Elements by ID - feeling", feelingUI);

    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&units=${unit}&APPID=${apiKey}`;
    console.log("getWeatherData - Get Elements by ID - URL ", url);

    const res = await fetch(url);

    const data = await res.json();
    console.log("Fetched Data ->", data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  console.log(`CALLED -> postData on URL: ${url}`);
  console.log(`With Data Object -> `, data);

  //   let jsData = await data.json();

  //   console.log(jsData);

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data)
    // body: JSON.stringify(jsData)
  });

  try {
    console.log(response);

    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const getProjectData = async url => {
  console.log(`CALLED -> getProjectData on URL: ${url}`);
  const res = await fetch(url);
  try {
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

//Update UI
const updateUI = async () => {
  console.log(`CALL -> Update UI`);

  const request = await fetch("/all");

  try {
    const allData = await request.json();
    console.log("updateUI -> ", allData);
    document.getElementById("date").innerHTML = `Today's ${allData.Date}`;
    document.getElementById("location").innerHTML = `at ${allData.Location}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Degree celsius ${allData.Temp}`;
    document.getElementById("content").innerHTML = `I feel ${allData.Content}`;
  } catch (error) {
    console.log("error", error);
  }
};
