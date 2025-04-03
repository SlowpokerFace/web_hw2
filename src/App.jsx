import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  const fetchCountryDetails = (name) => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => response.json())
      .then((data) => setSelectedCountry(data[0]))
      .catch((error) => console.error("Ошибка загрузки деталей:", error));
  };

  return (
    <div>
      <h1>Список стран</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            {country.name.common} <button onClick={() => fetchCountryDetails(country.name.common)}>Подробнее</button>
          </li>
        ))}
      </ul>
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Столица: {selectedCountry.capital}</p>
          <p>Население: {selectedCountry.population}</p>
          <img src={selectedCountry.flags.svg} alt={`Флаг ${selectedCountry.name.common}`} width={100} />
        </div>
      )}
    </div>
  );
}

export default App;