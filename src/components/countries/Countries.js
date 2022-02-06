import React, { useState, useEffect, memo } from 'react';
import Statistics from '../statistics/Statistics';
import Select from 'react-select';
import './styles.css';

function Countries() {
  const [countriesData, setCountriesData] = useState([]);
  const [sortList, setSortList] = useState([
    {
      label: 'active cases',
      value: 'active cases',
    },
    {
      label: 'deaths per million',
      value: 'deaths per million',
    },
    {
      label: 'cases per million',
      value: 'cases per million',
    },
  ]);
  const [sortValue, setSortValue] = useState([]);
  useEffect(async () => {
    let filterValue = localStorage.getItem('filterValue');
    setSortValue(filterValue);
    sortData();
  }, []);
  async function getCountryDetails() {
    const Url = 'https://disease.sh/v3/covid-19/countries';
    const res = await fetch(Url);
    const data = await res.json();
    console.log(data);
    let countryDeatails = [];
    data.map((element) => {
      const {
        todayCases,
        cases,
        todayDeaths,
        deaths,
        todayRecovered,
        recovered,
        critical,
        deathsPerOneMillion,
        casesPerOneMillion,
        active,
        country,
      } = element;
      countryDeatails.push({
        todayCases,
        cases,
        todayDeaths,
        deaths,
        todayRecovered,
        recovered,
        critical,
        deathsPerOneMillion,
        casesPerOneMillion,
        active,
        country,
      });
    });
    return countryDeatails;
  }
  async function sortData() {
    let countryDeatails = await getCountryDetails();
    if (sortValue === 'active cases') {
      countryDeatails.sort((a, b) => (a.active > b.active ? -1 : 1));
    } else if (sortValue === 'deaths per million') {
      countryDeatails.sort((a, b) =>
        a.deathsPerOneMillion > b.deathsPerOneMillion ? -1 : 1
      );
    } else if (sortValue === 'cases per million') {
      countryDeatails.sort((a, b) =>
        a.casesPerOneMillion > b.casesPerOneMillion ? -1 : 1
      );
    }
    setCountriesData(countryDeatails);
  }
  useEffect(() => {
    localStorage.setItem('filterValue', sortValue);
    sortData();
  }, [sortValue]);
  return (
    <div className='countries-wrapper'>
      <Select
        className='selection-list'
        options={sortList}
        onChange={(e) => setSortValue(e.value)}
      />
      <table>
        <tr>
          <th className='label'> Country </th>
          <th> Active Cases </th>
          <th> Recovered Cases </th>
          <th> Total Deaths </th>
        </tr>
      </table>
      {countriesData.map((element) => {
        return (
          <React.Fragment>
            <details key={element.country}>
              <summary>
                <table>
                  <tr>
                    <td className='label'>{element.country}</td>
                    <td>{element.active}</td>
                    <td>{element.recovered}</td>
                    <td>{element.deaths}</td>
                  </tr>
                </table>
              </summary>
              <div className='statistics'>
                <Statistics details={element} />
              </div>
            </details>
          </React.Fragment>
        );
      })}
    </div>
  );
}
export default memo(Countries);
