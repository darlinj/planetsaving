import React, {useState} from "react";
import {
  FormGroup,
  TextField,
  FormControl,
  Divider,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  InputAdornment,
  Grid,
} from "@mui/material";
import {UserDataInput} from "../../types";

type UserFormComponentParams = {
  initialFormValues: UserDataInput;
  saveChange: (formValues: UserDataInput) => void;
};

const MeatForm: React.FunctionComponent<UserFormComponentParams> = ({
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
          <Grid container direction={"column"} spacing={2} padding={1}>
            <Grid item xs={12}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="estimation-type"
                  value={formValues.meatEstimationType || "meals"}
                  onChange={onInputChange}
                  defaultValue={"meals"}
                  name="meatEstimationType"
                  row
                >
                  <FormControlLabel
                    value="meals"
                    control={<Radio />}
                    label="Meal based"
                  />
                  <FormControlLabel
                    value="weight"
                    control={<Radio />}
                    label="Weight"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {(formValues.meatEstimationType === "meals" ||
              formValues.meatEstimationType === undefined) && (
              <>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Number of meals per week containing beef"
                      id="beef-meals-consumed"
                      variant="outlined"
                      name="beefMealsPerWeek"
                      value={formValues.beefMealsPerWeek || ""}
                      onChange={onInputChangeNumber}
                      helperText="Where a meal contains about 100g of beef"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Number of meals per week containing lamb"
                      id="lamb-meals-consumed"
                      variant="outlined"
                      name="lambMealsPerWeek"
                      value={formValues.lambMealsPerWeek || ""}
                      onChange={onInputChangeNumber}
                      helperText="Where a meal contains about 100g of lamb"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Number of meals per week containing pork"
                      id="pork-meals-consumed"
                      variant="outlined"
                      name="porkMealsPerWeek"
                      value={formValues.porkMealsPerWeek || ""}
                      onChange={onInputChangeNumber}
                      helperText="Where a meal contains about 100g of pork"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Number of meals per week containing chicken"
                      id="chicken-meals-consumed"
                      variant="outlined"
                      name="chickenMealsPerWeek"
                      value={formValues.chickenMealsPerWeek || ""}
                      onChange={onInputChangeNumber}
                      helperText="Where a meal contains about 100g of chicken"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Number of meals per week containing cheese"
                      id="cheese-meals-consumed"
                      variant="outlined"
                      name="cheeseMealsPerWeek"
                      value={formValues.cheeseMealsPerWeek || ""}
                      onChange={onInputChangeNumber}
                      helperText="Where a meal contains about 100g of cheese"
                    />
                  </FormControl>
                </Grid>
              </>
            )}
            {formValues.meatEstimationType === "weight" && (
              <>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Beef consumed per week"
                      id="beef-consumed"
                      variant="outlined"
                      name="beefGramsPerWeek"
                      value={formValues.beefGramsPerWeek || ""}
                      onChange={onInputChangeNumber}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">grams</InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Lamb consumed per week"
                      id="lamb-consumed"
                      variant="outlined"
                      name="lambGramsPerWeek"
                      value={formValues.lambGramsPerWeek || ""}
                      onChange={onInputChangeNumber}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">grams</InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Pork consumed per week"
                      id="pork-consumed"
                      variant="outlined"
                      name="porkGramsPerWeek"
                      value={formValues.porkGramsPerWeek || ""}
                      onChange={onInputChangeNumber}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">grams</InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Chicken consumed per week"
                      id="chicken-consumed"
                      variant="outlined"
                      name="chickenGramsPerWeek"
                      value={formValues.chickenGramsPerWeek || ""}
                      onChange={onInputChangeNumber}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">grams</InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Cheese consumed per week"
                      id="cheese-consumed"
                      variant="outlined"
                      name="cheeseGramsPerWeek"
                      value={formValues.cheeseGramsPerWeek || ""}
                      onChange={onInputChangeNumber}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">grams</InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
              </>
            )}
            <Button type="submit" onClick={submitChange}>
              Update
            </Button>
          </Grid>
        </FormGroup>
      </form>
    </>
  );
};

export default MeatForm;
