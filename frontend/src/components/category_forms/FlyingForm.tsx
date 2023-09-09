import React from "react";
import {FormGroup, Divider, Button} from "@mui/material";
import {UserDataInput} from "../../types";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import TextInput from "../formComponents/TextInput";

const validations = Yup.object().shape({
  flyingHoursPerYear: Yup.number().typeError("This must be a number"),
});

type UserFormComponentParams = {
  initialFormValues: UserDataInput;
  saveChange: (formValues: UserDataInput) => void;
};

const FlyingForm: React.FunctionComponent<UserFormComponentParams> = ({
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
        const {isValid, dirty} = formik;
        return (
          <Form>
            <Divider sx={{marginTop: "1em", marginBottom: "1em"}} />
            <FormGroup sx={{marginBottom: "1em"}}>
              <Field
                name="flyingHoursPerYear"
                label="how many hours do you fly in a year"
                suffix="Hours"
                component={TextInput}
              />
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

export default FlyingForm;
