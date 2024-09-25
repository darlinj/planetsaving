import React from "react";
import { FormGroup, Divider, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextInput from "../formComponents/TextInput";
import { UserFormComponentParams } from "../../types";

const validations = Yup.object().shape({
  flyingHoursPerYear: Yup.number().typeError("This must be a number"),
});

const FlyingForm: React.FunctionComponent<UserFormComponentParams> = ({
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
                name="flyingHoursPerYear"
                label="how many hours do you fly in a year"
                suffix="Hours"
                component={TextInput}
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

export default FlyingForm;
