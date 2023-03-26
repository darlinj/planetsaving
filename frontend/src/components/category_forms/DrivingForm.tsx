import {
  FormGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  FormControl,
  Radio,
  RadioGroup,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import React, {useState} from "react";
import useUserData from "../../api/useUserData";
import useAddOrUpdateUser from "../../api/useAddOrUpdateUser";
import {UserDataInput} from "../../types";

const DrivingForm = () => {
  const userId = undefined;
  const {data, isLoading, isError} = useUserData(userId);
  const [formValues, setFormValues] = useState<UserDataInput>({});
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
        Loading...
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load data</div>;
  }

  if (!data) {
    return <div>No user data found</div>;
  }

  if (!isLoaded) {
    setFormValues(data);
    setIsLoaded(true);
  }

  const updateUser = () => {
    useAddOrUpdateUser(formValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({...formValues, drivingMilesPerYear: +e.currentTarget.value});
  };

  return (
    <>
      <form>
        <FormControl sx={{marginLeft: "1em", marginTop: "2em"}}>
          <FormGroup sx={{marginBottom: "1em"}}>
            <FormControl>
              <TextField
                label="Yearly Mileage"
                id="annual-mileage"
                variant="standard"
                required={true}
                defaultValue={data.drivingMilesPerYear}
                value={formValues.drivingMilesPerYear}
                onBlur={updateUser}
                onChange={handleChange}
              />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel id="engine-size">Engine Type</FormLabel>
            <RadioGroup
              aria-labelledby="engine-size"
              value={data.carType}
              name="engine-size"
            >
              <FormControlLabel
                value="ICE"
                control={<Radio />}
                label="Petrol or Diesel"
              />
              <FormControlLabel
                value="electric"
                control={<Radio />}
                label="Electric"
              />
            </RadioGroup>
          </FormGroup>
          <Divider sx={{marginTop: "1em", marginBottom: "1em"}} />
          <FormGroup>
            <FormLabel id="size-of-car">Size of car</FormLabel>
            <RadioGroup
              aria-labelledby="size-of-car"
              value={data.sizeOfCar}
              name="size-of-car"
            >
              <FormControlLabel
                value="small"
                control={<Radio />}
                label="Small"
              />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel
                value="large"
                control={<Radio />}
                label="Large or SUV"
              />
            </RadioGroup>
          </FormGroup>
        </FormControl>
      </form>
    </>
  );
};

export default DrivingForm;
