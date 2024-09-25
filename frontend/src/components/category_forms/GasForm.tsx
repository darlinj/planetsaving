import React from "react";
import {
  FormGroup,
  FormControl,
  Divider,
  Button,
  FormLabel,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextInput from "../formComponents/TextInput";
import RadioButton from "../formComponents/RadioButton";
import { UserFormComponentParams } from "../../types";

const validations = Yup.object().shape({
  gasEstimationType: Yup.string().required("validation type is required"),
  houseSize: Yup.string().required("validation type is required"),
  numberOfPeopleInHome: Yup.number().typeError("This must be a number"),
  kwhOfGasUsedPerYear: Yup.number().typeError("This must be a number"),
  m3OfGasUsedPerYear: Yup.number().typeError("This must be a number"),
});

const GasForm: React.FunctionComponent<UserFormComponentParams> = ({
  initialFormValues,
  saveChange,
}) => {
  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validations}
      onSubmit={saveChange}
    >
      {({ isSubmitting, values, isValid, errors }) => {
        return (
          <Form>
            <Divider sx={{ marginTop: "1em", marginBottom: "1em" }} />
            <FormGroup sx={{ marginBottom: "1em" }}>
              <Field
                name="numberOfPeopleInHome"
                label="How many people share your home"
                component={TextInput}
              />
              <Field
                name="gasEstimationType"
                component={RadioButton}
                label="Estimation type"
                row
                options={[
                  { value: "houseSize", label: "House size" },
                  { value: "kwh", label: "KWh" },
                  {
                    value: "m3",
                    label: (
                      <>
                        <Typography>
                          M<sup>3</sup>
                        </Typography>
                      </>
                    ),
                  },
                ]}
              />
              {(values.gasEstimationType === "houseSize" ||
                values.gasEstimationType === undefined) && (
                <FormControl>
                  <FormLabel id="house-size">House size</FormLabel>
                  <Field
                    name="houseSize"
                    component={RadioButton}
                    options={[
                      { value: "small", label: "Small house" },
                      { value: "medium", label: "Medium house" },
                      { value: "large", label: "Large house" },
                    ]}
                  />
                </FormControl>
              )}
              {values.gasEstimationType === "kwh" && (
                <Field
                  name="kwhOfGasUsedPerYear"
                  label="Annual gas consumed"
                  suffix="KWh"
                  component={TextInput}
                />
              )}
              {values.gasEstimationType === "m3" && (
                <Field
                  name="m3OfGasUsedPerYear"
                  label="Annual gas consumed"
                  suffix={
                    <>
                      <Typography>
                        M<sup>3</sup>
                      </Typography>
                    </>
                  }
                  component={TextInput}
                />
              )}
              <Button type="submit" disabled={isSubmitting}>
                Update
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

export default GasForm;
