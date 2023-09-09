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
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import TextInput from "../formComponents/TextInput";
import RadioButton from "../formComponents/RadioButton";

const validations = Yup.object().shape({
  electricityEstimationType: Yup.string().required(
    "validation type is required"
  ),
  houseSize: Yup.string().required("validation type is required"),
  numberOfPeopleInHome: Yup.number().typeError("This must be a number"),
  kwhOfElectricityUsedPerYear: Yup.number().typeError("This must be a number"),
});

type UserFormComponentParams = {
  initialFormValues: UserDataInput;
  saveChange: (formValues: UserDataInput) => void;
};

const ElectricityForm: React.FunctionComponent<UserFormComponentParams> = ({
  initialFormValues,
  saveChange,
}) => {
  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validations}
      onSubmit={(values) => saveChange(values)}
    >
      {(formik) => {
        const {isValid, dirty, values} = formik;
        return (
          <Form>
            <Divider sx={{marginTop: "1em", marginBottom: "1em"}} />
            <FormGroup sx={{marginBottom: "1em"}}>
              <Field
                name="numberOfPeopleInHome"
                label="How many people share your home"
                component={TextInput}
              />
              <Field
                name="electricityEstimationType"
                component={RadioButton}
                label="Estimation type"
                row
                options={[
                  {value: "houseSize", label: "House size"},
                  {value: "kwh", label: "KWh"},
                ]}
              />
              {(values.electricityEstimationType === "houseSize" ||
                values.electricityEstimationType === undefined) && (
                <Field
                  name="houseSize"
                  component={RadioButton}
                  label="House size"
                  options={[
                    {value: "small", label: "Small house"},
                    {value: "medium", label: "Medium house"},
                    {value: "large", label: "Large house"},
                  ]}
                />
              )}
              {values.electricityEstimationType === "kwh" && (
                <Field
                  name="kwhOfElectricityUsedPerYear"
                  label="Annual electricity consumed"
                  suffix="KWh"
                  component={TextInput}
                />
              )}
              <Button type="submit" disabled={!(dirty && isValid)}>
                Update
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ElectricityForm;
