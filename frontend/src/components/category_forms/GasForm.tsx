import React from "react";
import {
  FormGroup,
  FormControl,
  Divider,
  Button,
  FormLabel,
  Typography,
} from "@mui/material";
import {UserDataInput} from "../../types";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import TextInput from "../formComponents/TextInput";
import RadioButton from "../formComponents/RadioButton";

const validations = Yup.object().shape({
  gasEstimationType: Yup.string().required("validation type is required"),
  houseSize: Yup.string().required("validation type is required"),
  numberOfPeopleInHome: Yup.number().typeError("This must be a number"),
  kwhOfGasUsedPerYear: Yup.number().typeError("This must be a number"),
  m3OfGasUsedPerYear: Yup.number().typeError("This must be a number"),
});

type UserFormComponentParams = {
  initialFormValues: UserDataInput;
  saveChange: (formValues: UserDataInput) => void;
};

const GasForm: React.FunctionComponent<UserFormComponentParams> = ({
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
              <FormControl>
                <FormLabel id="estimation-type">Estimation type</FormLabel>
                <Field
                  name="gasEstimationType"
                  component={RadioButton}
                  options={[
                    {value: "houseSize", label: "House size"},
                    {value: "kwh", label: "KWh"},
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
              </FormControl>
              {(values.gasEstimationType === "houseSize" ||
                values.gasEstimationType === undefined) && (
                <FormControl>
                  <FormLabel id="house-size">House size</FormLabel>
                  <Field
                    name="houseSize"
                    component={RadioButton}
                    options={[
                      {value: "small", label: "Small house"},
                      {value: "medium", label: "Medium house"},
                      {value: "large", label: "Large house"},
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

export default GasForm;
