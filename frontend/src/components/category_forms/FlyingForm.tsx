import React from "react";
import {
  FormGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  FormControl,
  Radio,
  RadioGroup,
  Divider,
  InputAdornment,
} from "@mui/material";
import {UserDataInput} from "../../types";

type UserFormComponentParams = {
  formValues: UserDataInput;
  handleChangeAndSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitChange: () => void;
};

const FlyingForm: React.FunctionComponent<UserFormComponentParams> = ({
  formValues,
  handleChangeAndSubmit,
  handleChange,
  submitChange,
}) => {
  return (
    <>
      <form>
        <Divider sx={{marginTop: "1em", marginBottom: "1em"}} />
        <FormGroup sx={{marginBottom: "1em"}}>
          <FormControl>
            <TextField
              label="Yearly Mileage"
              id="annual-mileage"
              variant="outlined"
              name="drivingMilesPerYear"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">miles</InputAdornment>
                ),
              }}
              value={formValues.drivingMilesPerYear}
              onBlur={submitChange}
              onChange={handleChange}
            />
          </FormControl>
          <Divider sx={{marginTop: "1em", marginBottom: "1em"}} />
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

export default FlyingForm;
