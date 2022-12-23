import React from "react";
import Box from "@mui/material/Box";
import useFootprintData from "../api/useFootprintData";
import {getCategoryColorArray} from "../categoryColorMap";
import {Link, useParams} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import {Typography} from "@mui/material";
import {ClimateData} from "../types";

const Footprint = () => {
  //   const queryClient = useQueryClient();
  //   queryClient.invalidateQueries({queryKey: ["GetClimateData"]});
  const {category} = useParams();
  const {status, data, isLoading, isError, error} = useFootprintData(category);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError && error instanceof Error) {
    return <div>{error.message}</div>;
  }
  if (!data) {
    return <div>No data returned... {status}</div>;
  }
  const footHeight = 500;
  let stripeOffset = 0;
  let lastStripeHeight = 0;
  const totalAmount = data
    .map((item) => item.amount)
    .reduce((acc, val) => acc + val, 0);

  const FootprintFooter = () => {
    const totalCo2 = data
      .reduce((total, item) => {
        return total + item.amount;
      }, 0)
      .toFixed(1);
    return (
      <Typography
        id="footprint-footer"
        variant="h4"
        component="div"
        gutterBottom
      >
        Total {totalCo2} Tons of CO2 equivalent
      </Typography>
    );
  };

  const BackLink = () => {
    if (!category) {
      return <></>;
    }
    return (
      <Link to="/">
        <text x="0" y="20" fill="black">
          &#171; Back
        </text>
      </Link>
    );
  };

  const Stripe = ({
    stripe,
    stripeOffset,
    stripeHeight,
  }: {
    stripe: ClimateData;
    stripeOffset: number;
    stripeHeight: number;
  }) => {
    if (stripe.subCategories && stripe.subCategories.length === 0) {
      return (
        <rect
          clipPath="url('#foot')"
          width="500"
          y={stripeOffset}
          height={stripeHeight}
          style={{
            fill: getCategoryColorArray(stripe.color)[stripe.colorIntensity],
          }}
        />
      );
    }
    return (
      <Link to={`/f/${stripe.category}`} id={stripe.category}>
        <rect
          clipPath="url('#foot')"
          width="500"
          y={stripeOffset}
          height={stripeHeight}
          style={{
            fill: getCategoryColorArray(stripe.color)[stripe.colorIntensity],
          }}
        />
      </Link>
    );
  };

  return (
    <>
      <Typography variant="h4" component="div" gutterBottom align="center">
        Annual {category} Carbon footprint of the average UK citizen
      </Typography>
      <Box
        id="footprint"
        sx={{display: "flex", alignContent: "center", justifyContent: "center"}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <BackLink />
          {data.map((stripe, index) => {
            const stripeHeight = (stripe.amount / totalAmount) * footHeight;
            stripeOffset += lastStripeHeight;
            const midStripe = stripeOffset + stripeHeight / 2;
            lastStripeHeight = stripeHeight;
            return (
              <g key={index}>
                <Stripe
                  stripe={stripe}
                  stripeOffset={stripeOffset}
                  stripeHeight={stripeHeight}
                />
                <text x="0" y={midStripe} fill="black">
                  {stripe.label}
                </text>
                <text x="0" y={midStripe + 20} fill="black">
                  ({stripe.amount} Tons)
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
              d="M224.231,239.9c43.9,23.3,64.5,75.4,49.8,123.3c-2.7,8.6-5.1,17.5-7,26.4c-7.8,40,2.7,90.2,46.7,99.1
				c22.2,4.7,44.3-3.9,59.9-20.2c46.5-50.5,32.3-202.6,31.9-240.7c0-16.7-0.4-33.8-7-49.4c-14.8-35-56.4-49-93.3-58.7
				c-60.6-22.1-98.8,5.8-111.6,26.4S171.531,212.5,224.231,239.9z"
            />
            <ellipse cx="181.831" cy="44.3" rx="31.5" ry="44.3" />
            <ellipse cx="254.631" cy="51.7" rx="18.7" ry="26.4" />
            <ellipse cx="312.931" cy="68" rx="16.7" ry="23.3" />
            <ellipse cx="366.131" cy="81.7" rx="14.8" ry="20.6" />
            <ellipse
              transform="matrix(-0.2014 0.9795 -0.9795 -0.2014 586.9331 -227.4809)"
              cx="366.2"
              cy="109.218"
              rx="18.3"
              ry="13.2"
            />
          </clipPath>
          Sorry, your browser does not support inline SVG.
        </svg>
      </Box>
      <FootprintFooter />
    </>
  );
};

export default Footprint;
