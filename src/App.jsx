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

      {selectedCountry && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: "#000", 
            color: "#fff", 
            borderRadius: "10px", 
          }}
        >
          <h2>{selectedCountry.name.common}</h2>
          {loading ? (
            <div>Загрузка...</div>
          ) : (
            <>
              <p>Столица: {selectedCountry.capital}</p>
              <p>Население: {selectedCountry.population}</p>
              <img
                src={selectedCountry.flags.svg}
                alt={`Флаг ${selectedCountry.name.common}`}
                width={100}
              />
            </>
          )}
        </div>
      )}


      <ul>
        {countries.map((country) => (
          <li
            key={country.cca3}
            onClick={() => fetchCountryDetails(country.name.common)}
            style={{
              cursor: "pointer",
              marginBottom: "5px",
              padding: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            {country.name.common}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
