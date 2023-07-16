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
              label="how many hours do you fly in a year"
              id="annual-mileage"
              variant="outlined"
              name="flyingHoursPerYear"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Hours</InputAdornment>
                ),
              }}
              value={formValues.flyingHoursPerYear}
              onBlur={submitChange}
              onChange={handleChange}
            />
          </FormControl>
        </FormGroup>
      </form>
    </>
  );
};

export default FlyingForm;
