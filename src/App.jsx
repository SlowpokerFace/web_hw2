import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  const fetchCountryDetails = (name) => {
    setLoading(true); 
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCountry(data[0]); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Ошибка загрузки деталей:", error);
        setLoading(false); 
      });
  };

  return (
    <div>
      <h1>Список стран</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.cca3} onClick={() => fetchCountryDetails(country.name.common)}>
            {country.name.common}
          </li>
        ))}
      </ul>

      {loading && <div>Загрузка...</div>}

      {selectedCountry && !loading && (
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
