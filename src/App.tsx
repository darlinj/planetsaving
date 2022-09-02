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
import {ClimateData, ActionData} from "./types";
import Footprint from "./components/Footprint";

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
          Planet saving expert
        </Typography>
        <Typography variant="body1" component="div" gutterBottom align="center">
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

export default App;
