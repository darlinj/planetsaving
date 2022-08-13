import React from "react";
import "./App.css";
import {green} from "@mui/material/colors";

interface ClimateData {
  amount: number;
  label: string;
}

function App() {
  const data: ClimateData[] = [
    {amount: 25, label: "Things you buy"},
    {amount: 20, label: "Food"},
    {amount: 15, label: "Transport"},
    {amount: 10, label: "Schools and hospitals"},
    {amount: 10, label: "Housing"},
  ];
  return (
    <div className="App">
      <h1>Annual Carbon footprint of the average UK citizen</h1>
      <Footprint data={data} />
    </div>
  );
}

const Footprint = ({data}: {data: ClimateData[]}) => {
  const footHeight = 500;
  let stripeOffset = 0;
  let lastStripeHeight = 0;
  const totalAmount = data
    .map((item) => item.amount)
    .reduce((acc, val) => acc + val, 0);
  return (
    <svg width="400" height="700">
      {data.map((stripe, index) => {
        const stripeHeight = (stripe.amount / totalAmount) * footHeight;
        stripeOffset += lastStripeHeight;
        const midStripe = stripeOffset + stripeHeight / 2;
        lastStripeHeight = stripeHeight;
        const greens = Object.values(green);
        return (
          <g key={index}>
            <rect
              clipPath="url('#foot')"
              width="500"
              y={stripeOffset}
              height={stripeHeight}
              style={{
                fill: greens[index],
              }}
            />
            <text x="0" y={midStripe} fill="black">
              {stripe.label}
            </text>
          </g>
        );
      })}
      <clipPath id="clip1">
        <circle
          cx="100"
          cy="100"
          r="40"
          stroke="black"
          strokeWidth="3"
          fill="none"
        />
      </clipPath>
      <clipPath id="foot">
        <path
          d="M184.231,239.9c43.9,23.3,64.5,75.4,49.8,123.3c-2.7,8.6-5.1,17.5-7,26.4c-7.8,40,2.7,90.2,46.7,99.1
				c22.2,4.7,44.3-3.9,59.9-20.2c46.5-50.5,32.3-202.6,31.9-240.7c0-16.7-0.4-33.8-7-49.4c-14.8-35-56.4-49-93.3-58.7
				c-60.6-22.1-98.8,5.8-111.6,26.4S131.531,212.5,184.231,239.9z"
        />
        <ellipse cx="141.831" cy="44.3" rx="31.5" ry="44.3" />
        <ellipse cx="214.631" cy="51.7" rx="18.7" ry="26.4" />
        <ellipse cx="272.931" cy="68" rx="16.7" ry="23.3" />
        <ellipse cx="326.131" cy="81.7" rx="14.8" ry="20.6" />
        <ellipse
          transform="matrix(-0.2014 0.9795 -0.9795 -0.2014 546.9331 -227.4809)"
          cx="366.2"
          cy="109.218"
          rx="18.3"
          ry="13.2"
        />
      </clipPath>
      Sorry, your browser does not support inline SVG.
    </svg>
  );
};

export default App;
