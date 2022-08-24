import React from "react";
import "./App.css";
import {green, red, blue, orange, yellow} from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

interface ClimateData {
  amount: number;
  label: string;
  color: string;
  subSection: ClimateData[] | null;
}

interface ActionData {
  actionTitle: string;
  cost: number;
  carbonSaved: number;
  actionType: "energy" | "food" | "transport" | "government" | "purchasing";
}

const categoryColorMap = {
  energy: yellow,
  transport: orange,
  food: blue,
  government: green,
  purchasing: red,
};

const data: ClimateData[] = [
  {
    amount: 3.2,
    subSection: null,
    color: red[500],
    label: "Things you buy",
  },
  {
    amount: 2.4,
    subSection: null,
    color: orange[500],
    label: "Transport",
  },
  {amount: 2, subSection: null, color: yellow[500], label: "Energy"},
  {
    amount: 1.1,
    subSection: null,
    color: green[500],
    label: "Schools and hospitals",
  },
  {amount: 1.9, subSection: null, color: blue[500], label: "Food"},
];

const actions: ActionData[] = [
  {
    actionTitle: "Reduce your thermostat by one degree",
    cost: 0,
    carbonSaved: 0.3,
    actionType: "energy",
  },
  {
    actionTitle: "Buy an electric car",
    cost: 30000,
    carbonSaved: 1.0,
    actionType: "transport",
  },
  {
    actionTitle: "Stop buying air freighted food",
    cost: 0,
    carbonSaved: 0.3,
    actionType: "food",
  },
  {
    actionTitle: "Buy more second hand things",
    cost: 0,
    carbonSaved: 0.4,
    actionType: "purchasing",
  },
];

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" component="div" gutterBottom align="center">
          Planet saver expert
        </Typography>
        <Typography variant="body" component="div" gutterBottom align="center">
          Want to do your bit to help save the planet. Here you can visualize
          your carbon footprint and get practical suggestions about how you can
          reduce your impact on the planet.
        </Typography>
      </Grid>
      <Grid item xs={8} sx={{minWidth: 440}}>
        <Paper
          sx={{
            padding: 1,
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" component="div" gutterBottom>
            Annual Carbon footprint of the average UK citizen
          </Typography>
          <Footprint data={data} />
          <Typography variant="h4" component="div" gutterBottom>
            Total 10.6 Tons of CO2 equivalent
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <ActionsList actionData={actions} />
      </Grid>
    </Grid>
  );
}

const ActionsList = ({actionData}: {actionData: ActionData[]}) => {
  return (
    <Paper
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 2,
        minWidth: 280,
      }}
    >
      <Typography variant="h4" component="div" gutterBottom align="center">
        Top actions you can take
      </Typography>
      {actionData.map((action) => {
        return <SuggestedActionCard action={action} />;
      })}
    </Paper>
  );
};

const SuggestedActionCard = ({action}: {action: ActionData}) => {
  const colorArray = categoryColorMap[action.actionType];
  return (
    <Card
      sx={{
        borderRadius: "16px",
        backgroundColor: colorArray[500],
        marginBottom: 2,
      }}
    >
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              sx={{color: colorArray[800], backgroundColor: colorArray[300]}}
            >
              <LocalFireDepartmentIcon />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{color: colorArray[800]}}>
              <FavoriteIcon />
            </IconButton>
          }
          title={action.actionTitle}
          sx={{paddingBottom: 0}}
        />
        <CardContent sx={{paddingTop: 0}}>
          <Box display={"flex"}>
            <ImpactWell color={colorArray[800]} text={`Cost=£${action.cost}`} />
            <ImpactWell
              color={colorArray[800]}
              text={`CO2 saved=${action.carbonSaved}T`}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="button">Learn More</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ImpactWell = ({text, color}: {text: string; color: string}) => {
  return (
    <Box
      sx={{
        borderRadius: 3,
        margin: 1,
        display: "flex",
        justifyContent: "center",
        width: 100,
        backgroundColor: color,
      }}
    >
      <Typography
        color="black"
        variant="body1"
        sx={{
          fontSize: 10,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

const Footprint = ({data}: {data: ClimateData[]}) => {
  const footHeight = 500;
  let stripeOffset = 0;
  let lastStripeHeight = 0;
  const totalAmount = data
    .map((item) => item.amount)
    .reduce((acc, val) => acc + val, 0);
  return (
    <Box
      sx={{display: "flex", alignContent: "center", justifyContent: "center"}}
    >
      <svg width="450" height="500">
        {data.map((stripe, index) => {
          const stripeHeight = (stripe.amount / totalAmount) * footHeight;
          stripeOffset += lastStripeHeight;
          const midStripe = stripeOffset + stripeHeight / 2;
          lastStripeHeight = stripeHeight;
          return (
            <g key={index}>
              <rect
                clipPath="url('#foot')"
                width="500"
                y={stripeOffset}
                height={stripeHeight}
                style={{
                  fill: stripe.color,
                }}
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
  );
};

export default App;
