import React, { useState, useEffect } from "react";
import axios from "axios";

import ClockForm from "./components/ClockForm";
import Clocks from "./components/Clocks";

function App() {
  const [options, setOptions] = useState(() => {
    return JSON.parse(localStorage.getItem("options")) || [];
  });

  const [cities, setCities] = useState(() => {
    return JSON.parse(localStorage.getItem("cities")) || [];
  });

  // load Data when first time on the site
  useEffect(() => {
    if (!localStorage.getItem("options")) {
      async function getPosts() {
        try {
          const respone = await axios.get(
            "https://xtc5m.sse.codesandbox.io/data"
          );

          setOptions(respone.data);
        } catch (error) {
          console.log("Fail tp get api: ", error);
        }
      }
      getPosts();
    }
  }, []);
  // delete Clock and add Option
  const handleClockClick = clickedCity => {
    const index = cities.findIndex(city => city.value === clickedCity.value);
    if (index < 0) return;

    // delete Clock
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities(newCities);
    localStorage.setItem("cities", JSON.stringify(newCities));

    // add Option
    const newOptions = [...options];
    newOptions.push(clickedCity);
    setOptions(newOptions);
    localStorage.setItem("options", JSON.stringify(newOptions));
  };

  // add Clock and delete Option
  const handleSubmitForm = selectedCity => {
    const index = options.findIndex(
      option => option.value === selectedCity.value
    );
    if (index < 0) return;

    // add Clock
    const newCities = [...cities];
    newCities.push(selectedCity);
    setCities(newCities);
    localStorage.setItem("cities", JSON.stringify(newCities));

    // delete Option
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    localStorage.setItem("options", JSON.stringify(newOptions));
  };

  return (
    <div className="App">
      <ClockForm options={options} onSubmitForm={handleSubmitForm} />
      <Clocks cities={cities} onClockClick={handleClockClick} />
    </div>
  );
}

export default App;
