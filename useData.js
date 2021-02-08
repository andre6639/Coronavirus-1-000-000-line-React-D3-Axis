import { useState, useEffect } from 'react';
import { csv, timeParse } from 'd3';

// const csvUrl =
// 	'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/92b89486844866ec22d9eee2cc59f1da9d5e05ae/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const csvUrl =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const sum = (accumulator, currentValue) =>
  accumulator + currentValue;

const parseDay = timeParse('%m/%d/%y');

const transform = (rawData) => {
  const days = rawData.columns.slice(4);
  return days.map((day) => ({
    date: parseDay(day),
    deathTotal: rawData.map((d) => +d[day]).reduce(sum, 0),
  }));
};

export const useData = () => {
  const [data, setData] = useState();
  useEffect(() => {
    csv(csvUrl).then((rawData) => {
      setData(transform(rawData));
    });
  }, []);
  
  console.log(data)

  return data;
};
