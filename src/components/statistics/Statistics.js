import React, { memo } from 'react';
import './styles.css';

function Statistics(props) {
  // console.log(props.details);
  return (
    <div className='statistic-wrapper'>
      <div className='card'>
        <h3>New Cases</h3>
        <h2 className='primary red'>{props.details.todayCases}</h2>
        <h3>
          Total : <span className='secondary blue'>{props.details.cases}</span>
        </h3>
      </div>
      <div className='card'>
        <h3>New Deaths</h3>
        <h2 className='primary red'>{props.details.todayDeaths}</h2>
        <h3>
          Total : <span className='secondary blue'>{props.details.deaths}</span>
        </h3>
      </div>
      <div className='card'>
        <h3>Recovered Today</h3>
        <h2 className='primary green'>{props.details.todayRecovered}</h2>
        <h3>
          Total :
          <span className='secondary blue'>{props.details.recovered}</span>
        </h3>
      </div>
      <div className='card'>
        <h3>Critical Cases</h3>
        <h2 className='primary red'>{props.details.critical}</h2>
        <h3>
          Active Cases :
          <span className='secondary blue'>{props.details.active}</span>
        </h3>
      </div>
      <div className='card'>
        <h3>Deaths per million</h3>
        <h2 className='primary red'>{props.details.deathsPerOneMillion}</h2>
        <h3>
          cases per million :
          <span className='secondary blue'>
            {props.details.casesPerOneMillion}
          </span>
        </h3>
      </div>
    </div>
  );
}
export default memo(Statistics);
