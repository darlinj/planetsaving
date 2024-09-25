import React from "react";
import { FormGroup, Divider, Button } from "@mui/material";
import { UserFormComponentParams } from "../../types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextInput from "../formComponents/TextInput";
import RadioButton from "../formComponents/RadioButton";

const validations = Yup.object().shape({
  sizeOfCar: Yup.string().required("validation type is required"),
  carType: Yup.string().required("validation type is required"),
  drivingMilesPerYear: Yup.number().typeError("This must be a number"),
});

const DrivingForm: React.FunctionComponent<UserFormComponentParams> = ({
  initialFormValues,
  saveChange,
}) => {
  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validations}
      onSubmit={saveChange}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <Divider sx={{ marginTop: "1em", marginBottom: "1em" }} />
            <FormGroup sx={{ marginBottom: "1em" }}>
              <Field
                name="drivingMilesPerYear"
                label="Yearly Mileage"
                component={TextInput}
              />
              <Divider sx={{ marginTop: "1em", marginBottom: "1em" }} />

              <Field
                name="carType"
                id="carType"
                label="Engine Type"
                component={RadioButton}
                options={[
                  { value: "ICE", label: "Petrol or Diesel" },
                  { value: "electric", label: "Electric" },
                ]}
              />
              <Divider sx={{ marginTop: "1em", marginBottom: "1em" }} />
              <Field
                name="sizeOfCar"
                label="Size of car"
                component={RadioButton}
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
              />
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

export default DrivingForm;
