import { useState } from 'react'
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [days, setDays] = useState(1);
  const [forecast, setForecast] = useState(null);

  const API_KEY = "8adbfb04e6054d9789763919252011";

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('cerah') || conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return '☀️';
    } else if (conditionLower.includes('berawan') || conditionLower.includes('cloudy') || conditionLower.includes('awan')) {
      return '☁️';
    } else if (conditionLower.includes('hujan') || conditionLower.includes('rain')) {
      return '🌧️';
    } else if (conditionLower.includes('badai') || conditionLower.includes('storm') || conditionLower.includes('petir') || conditionLower.includes('thunder')) {
      return '⛈️';
    } else if (conditionLower.includes('salju') || conditionLower.includes('snow')) {
      return '❄️';
    } else if (conditionLower.includes('kabut') || conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return '🌫️';
    } else if (conditionLower.includes('sebagian') || conditionLower.includes('partly')) {
      return '⛅';
    } else {
      return '🌤️';
    }
  };

  const getWeather = async () => {
    if (!city) return alert("Masukkan Nama Kota!");
    
    // Validasi input jumlah hari
    if (days < 1 || days > 14 || isNaN(days)) {
      return alert("Jumlah hari harus antara 1 hingga 14!");
    }

    try {
      const response = await axios.get(
         `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=id`
      );
      setWeather(response.data);
      setForecast(response.data.forecast);
      
      // Tambahkan nama kota dari API ke riwayat
      const cityName = response.data.location.name;
      if (!history.includes(cityName)) {
        setHistory((prevHistory) => [...prevHistory, cityName]);
      }
    } catch (error) {
      alert("Kota tidak ditemukan!");
    }
  };

  return(
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans">
      <h1 className="text-3xl font-semibold text-blue-600 mb-8">Aplikasi Cuaca
      </h1>
  
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Masukkan Nama Kota..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Hari (1-14)"
          value={days}
          onChange={(e) => setDays(Math.min(14, Math.max(1, Number(e.target.value) || 1)))}
          min="1"
          max="14"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-32"
        />

        <button
          onClick={getWeather}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Cek Cuaca
        </button>
      </div>

      {weather && (
        <div className="bg-white p-6 rounded-md shadow-md w-80 text-center">
          <h2 className="text-2xl font-semibold mb-4">{weather.location.name}</h2>
          <div className="text-6xl mb-4">{getWeatherIcon(weather.current.condition.text)}</div>
          <p className="text-xl mb-2"> Suhu: {weather.current.temp_c}°C </p>
          <p className="text-xl mb-2"> Cuaca: {weather.current.condition.text} </p>

        </div>

      )}

      {forecast && (
        <div className="bg-white p-6 rounded-md shadow-md mt-6 w-auto max-w-6xl">
          <h3 className="text-2xl font-semibold mb-4 text-center">Ramalan Cuaca {days} Hari</h3>
          <div className="space-y-6">
            {forecast.forecastday.map((day, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="bg-white p-4 rounded-md mb-4">
                  <p className="font-semibold text-xl mb-3 text-blue-600">{day.date}</p>
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-5xl">{getWeatherIcon(day.day.condition.text)}</div>
                    <div className="text-left">
                      <p className="text-md"><span className="font-semibold">Suhu:</span> {day.day.avgtemp_c}°C</p>
                      <p className="text-md"><span className="font-semibold">Max:</span> {day.day.maxtemp_c}°C | <span className="font-semibold">Min:</span> {day.day.mintemp_c}°C</p>
                      <p className="text-md"><span className="font-semibold">Deskripsi:</span> {day.day.condition.text}</p>
                      <p className="text-md"><span className="font-semibold">Kelembaban:</span> {day.day.avghumidity}%</p>
                      <p className="text-md"><span className="font-semibold">Kemungkinan Hujan:</span> {day.day.daily_chance_of_rain}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-lg mb-3 text-gray-700">Ramalan Per Jam:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {day.hour.map((hourData, hourIndex) => (
                      <div key={hourIndex} className="bg-white p-3 rounded-md text-center border border-gray-200 hover:shadow-md transition-shadow">
                        <p className="font-semibold text-sm text-blue-600 mb-2">
                          {new Date(hourData.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <div className="text-3xl mb-2">{getWeatherIcon(hourData.condition.text)}</div>
                        <p className="text-sm font-semibold">{hourData.temp_c}°C</p>
                        <p className="text-xs text-gray-600 mt-1">{hourData.condition.text}</p>
                        <p className="text-xs text-gray-500 mt-1">💧 {hourData.humidity}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-8 w-80">
          <h3 className="text-xl font-semibold mb-4 text-center">Riwayat Pencarian Kota</h3>
          <ul className="list-disc list-inside space-y-2">
            {history.map((item, index) => (
              <li 
                key={index} 
                className="text-gray-700 cursor-pointer hover:text-blue-600 hover:font-semibold transition-colors"
                onClick={() => {
                  setCity(item);
                  setTimeout(() => {
                    getWeather();
                  }, 100);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
         
        
  )
}

export default App;