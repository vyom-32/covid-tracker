import './App.css';
import { useState, useEffect } from 'react';
import Statistics from './components/statistics/Statistics';
import Countries from './components/countries/Countries';
import Select from 'react-select';

function App() {
  const [details, setDetails] = useState({});
  const [countriesList, setCountriestList] = useState([
    {
      value: 'all',
      label: 'World Wide',
    },
  ]);
  const [SearchText, setSearchText] = useState('all');
  useEffect(async () => {
    let url =
      SearchText == 'all'
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${SearchText}`;
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'covid-193.p.rapidapi.com',
          'x-rapidapi-key':
            '1f62fd6d98msh4c482cf1eded21fp16d20bjsna808728d0e05',
        },
      });
      let result = await response.json();
      setDetails(result);
    } catch (err) {
      console.log(err);
    }
  }, [SearchText]);
  useEffect(async () => {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/countries', {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'covid-193.p.rapidapi.com',
          'x-rapidapi-key':
            '1f62fd6d98msh4c482cf1eded21fp16d20bjsna808728d0e05',
        },
      });
      const result = await response.json();
      let list = [{ label: 'World wide', value: 'all' }];
      result.map((element) => {
        list.push({ value: element.country, label: element.country });
      });
      setCountriestList(list);
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <div className='App'>
      <Select
        options={countriesList}
        defaultValue={{ label: 'World Wide', value: '0' }}
        onChange={(e) => setSearchText(e.value)}
      />
      <Statistics details={details} />
      <Countries />
    </div>
  );
}

export default App;
