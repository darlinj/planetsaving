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
  Typography,
} from "@mui/material";
import {UserDataInput} from "../../types";

type UserFormComponentParams = {
  initialFormValues: UserDataInput;
  saveChange: (formValues: UserDataInput) => void;
};

const GasForm: React.FunctionComponent<UserFormComponentParams> = ({
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
              value={formValues.gasEstimationType || "houseSize"}
              onChange={onInputChange}
              defaultValue={"houseSize"}
              name="gasEstimationType"
              row
            >
              <FormControlLabel
                value="houseSize"
                control={<Radio />}
                label="House size"
              />
              <FormControlLabel value="kwh" control={<Radio />} label="KWh" />
              <FormControlLabel
                value="m3"
                control={<Radio />}
                label={
                  <>
                    <Typography>
                      M<sup>3</sup>
                    </Typography>
                  </>
                }
              />
            </RadioGroup>
          </FormControl>
          {(formValues.gasEstimationType === "houseSize" ||
            formValues.gasEstimationType === undefined) && (
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
          {formValues.gasEstimationType === "kwh" && (
            <FormControl>
              <TextField
                label="Annual gas consumed"
                id="gas-consumed"
                variant="outlined"
                name="kwhOfGasUsedPerYear"
                value={formValues.kwhOfGasUsedPerYear}
                onChange={onInputChangeNumber}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KWh</InputAdornment>
                  ),
                }}
              />
            </FormControl>
          )}
          {formValues.gasEstimationType === "m3" && (
            <FormControl>
              <TextField
                label="Annual gas consumed"
                id="gas-consumed"
                variant="outlined"
                name="m3OfGasUsedPerYear"
                value={formValues.m3OfGasUsedPerYear || ""}
                onChange={onInputChangeNumber}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      M<sup>3</sup>
                    </InputAdornment>
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

export default GasForm;
