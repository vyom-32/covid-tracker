import React, { useState, useEffect, memo } from 'react';
import Statistics from '../statistics/Statistics';
import './styles.css';

function Countries() {
  const [CountriesData, setCountriesData] = useState([]);
  useEffect(async () => {
    const Url = 'https://disease.sh/v3/covid-19/countries';
    const res = await fetch(Url);
    const data = await res.json();
    console.log(data);
    const countryDeatails = [];
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
    CountriesData.sort((a, b) => (a.country > b.country ? -1 : 1));
    setCountriesData(countryDeatails);
  }, []);
  return (
    <div className='countries-wrapper'>
      <table>
        <tr>
          <th className='label'> Country </th>
          <th> Active Cases </th>
          <th> Recovered Cases </th>
          <th> Total Deaths </th>
        </tr>
      </table>
      {CountriesData.map((element) => {
        return (
          <React.Fragment>
            <details>
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
              <Statistics details={element} />
            </details>
          </React.Fragment>
        );
      })}
    </div>
  );
}
export default memo(Countries);
