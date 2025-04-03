import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false); // Для индикатора загрузки деталей

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  const fetchCountryDetails = (name) => {
    setLoading(true); // Включаем индикатор загрузки
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCountry(data[0]); // Сохраняем данные выбранной страны
        setLoading(false); // Выключаем индикатор загрузки
      })
      .catch((error) => {
        console.error("Ошибка загрузки деталей:", error);
        setLoading(false); // Выключаем индикатор загрузки в случае ошибки
      });
  };

  return (
    <div>
      <h1>Список стран</h1>

      {/* Блок с выбранной страной */}
      {selectedCountry && (
        <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px", backgroundColor: "#f9f9f9" }}>
          <h2>{selectedCountry.name.common}</h2>
          {loading ? (
            <div>Загрузка...</div>
          ) : (
            <>
              <p>Столица: {selectedCountry.capital}</p>
              <p>Население: {selectedCountry.population}</p>
              <img src={selectedCountry.flags.svg} alt={`Флаг ${selectedCountry.name.common}`} width={100} />
            </>
          )}
        </div>
      )}

      {/* Список стран */}
      <ul>
        {countries.map((country) => (
          <li
            key={country.cca3}
            onClick={() => fetchCountryDetails(country.name.common)}
            style={{ cursor: "pointer", marginBottom: "5px", padding: "5px", border: "1px solid #ddd", borderRadius: "5px" }}
          >
            {country.name.common}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
