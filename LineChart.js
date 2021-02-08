import React from 'react';
import {
  scaleTime,
  scaleLinear,
  extent,
  max,
  line,
} from 'd3';
import { XMarkerLine } from './XMarkerLine';
import { YMarkerLine } from './YMarkerLine';
import { XAxis } from './XAxis';

const xValue = (d) => d.date;
const yValue = (d) => d.deathTotal;

const margin = { top: 50, right: 70, bottom: 50, left: 50 };

export const LineChart = ({ data, width, height }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0]);

  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)));

  const mostRecentDate = xScale.domain()[1];

  return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${margin.left},${margin.top})`}
      >
        <YMarkerLine
          value={1000000}
          yScale={yScale}
          innerWidth={innerWidth}
        />
        <XMarkerLine
          value={mostRecentDate}
          xScale={xScale}
          innerHeight={innerHeight}
        />
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <path d={lineGenerator(data)} />
      </g>
    </svg>
  );
};
