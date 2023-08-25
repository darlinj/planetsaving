import React, {useState} from "react";
import {
  FormGroup,
  TextField,
  FormControl,
  Divider,
  InputAdornment,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import {UserDataInput} from "../../types";

type UserFormComponentParams = {
  initialFormValues: UserDataInput;
  saveChange: (formValues: UserDataInput) => void;
};

const ElectricityForm: React.FunctionComponent<UserFormComponentParams> = ({
  initialFormValues,
  saveChange,
}) => {
  const [formValues, setFormValues] =
    useState<UserDataInput>(initialFormValues);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
  };

  const onInputChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: +value});
  };

  const submitChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    saveChange(formValues);
  };
  return (
    <>
      <form>
        <Divider sx={{marginTop: "1em", marginBottom: "1em"}} />
        <FormGroup sx={{marginBottom: "1em"}}>
          <FormControl>
            <TextField
              label="How many people share your home"
              id="people-in-home"
              variant="outlined"
              name="numberOfPeopleInHome"
              value={formValues.numberOfPeopleInHome}
              onChange={onInputChangeNumber}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="estimation-type">Estimation type</FormLabel>
            <RadioGroup
              aria-labelledby="estimation-type"
              value={formValues.electricityEstimationType || "houseSize"}
              onChange={onInputChange}
              defaultValue={"houseSize"}
              name="electricityEstimationType"
              row
            >
              <FormControlLabel
                value="houseSize"
                control={<Radio />}
                label="House size"
              />
              <FormControlLabel value="kwh" control={<Radio />} label="KWh" />
            </RadioGroup>
          </FormControl>
          {(formValues.electricityEstimationType === "houseSize" ||
            formValues.electricityEstimationType === undefined) && (
            <FormControl>
              <FormLabel id="house-size">House size</FormLabel>
              <RadioGroup
                aria-labelledby="house-size"
                value={formValues.houseSize}
                onChange={onInputChange}
                name="houseSize"
              >
                <FormControlLabel
                  value="small"
                  control={<Radio />}
                  label="Small house"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="Medium house"
                />
                <FormControlLabel
                  value="large"
                  control={<Radio />}
                  label="Large house"
                />
              </RadioGroup>
            </FormControl>
          )}
          {formValues.electricityEstimationType === "kwh" && (
            <FormControl>
              <TextField
                label="Annual electricity consumed"
                id="electricity-consumed"
                variant="outlined"
                name="kwhOfElectricityUsedPerYear"
                value={formValues.kwhOfElectricityUsedPerYear}
                onChange={onInputChangeNumber}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KWh</InputAdornment>
                  ),
                }}
              />
            </FormControl>
          )}
          <Button type="submit" onClick={submitChange}>
            Update
          </Button>
        </FormGroup>
      </form>
    </>
  );
};

export default ElectricityForm;
