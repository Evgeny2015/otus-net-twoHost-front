import { useEffect, useState } from 'react'
import './App.css'

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    const [forecast, setForecast] = useState<Forecast[]>()

    const getForecast = async () => {
        const url = `${import.meta.env.VITE_BACK_URL ?? ''}/WeatherForecast`        
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setForecast(data);
        }
    }

    useEffect(() => {        
        getForecast()
    }, [])

    const contents = forecast === undefined
        ? <p><em>Loading... </em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecast.map(x =>
                    <tr key={x.date}>
                        <td>{x.date}</td>
                        <td>{x.temperatureC}</td>
                        <td>{x.temperatureF}</td>
                        <td>{x.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

  return (
    <>
      <h1>Weather</h1>
          <div className="card">
              {contents }
      </div>
    </>
  )
}

export default App
