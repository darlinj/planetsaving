import React, {useState} from "react";
import {
  FormGroup,
  TextField,
  FormControl,
  Divider,
  InputAdornment,
  Button,
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
              onChange={onInputChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Annual gas consumed"
              id="gas-consumed"
              variant="outlined"
              name="kwhOfGasUsedPerYear"
              value={formValues.kwhOfGasUsedPerYear}
              onChange={onInputChange}
            />
          </FormControl>
          <Button type="submit" onClick={submitChange}>
            Update
          </Button>
        </FormGroup>
      </form>
    </>
  );
};

export default GasForm;
