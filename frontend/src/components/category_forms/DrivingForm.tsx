import {
  FormGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  FormControl,
  Radio,
  RadioGroup,
  Divider,
  CircularProgress,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import useUserData from "../../api/useUserData";
import useAddOrUpdateUser from "../../api/useAddOrUpdateUser";
import {UserDataInput} from "../../types";

const DrivingForm = () => {
  const userId = undefined;
  const {data, isLoading, isError} = useUserData(userId);
  const [formValues, setFormValues] = useState<UserDataInput>({});
  const {mutate} = useAddOrUpdateUser();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (formValues.dirty) {
      mutate(formValues);
    }
  }, [formValues]);

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

  const submitChange = () => {
    setFormValues({...formValues, dirty: true});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
  };

  const handleChangeAndSubmit = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value, dirty: true});
  };

  return (
    <>
      <form>
        <FormGroup sx={{marginBottom: "1em"}}>
          <FormControl>
            <TextField
              label="Yearly Mileage"
              id="annual-mileage"
              variant="standard"
              required={true}
              name="drivingMilesPerYear"
              value={formValues.drivingMilesPerYear}
              onBlur={submitChange}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="engine-size">Engine Type</FormLabel>
            <RadioGroup
              aria-labelledby="engine-size"
              value={formValues.carType}
              onChange={handleChangeAndSubmit}
              name="carType"
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
          </FormControl>
          <Divider sx={{marginTop: "1em", marginBottom: "1em"}} />
          <FormControl>
            <FormLabel id="size-of-car">Size of car</FormLabel>
            <RadioGroup
              aria-labelledby="size-of-car"
              value={formValues.sizeOfCar}
              onChange={handleChangeAndSubmit}
              name="sizeOfCar"
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
          </FormControl>
        </FormGroup>
      </form>
    </>
  );
};

export default DrivingForm;
