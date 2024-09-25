import React from "react";
import { FormGroup, Divider, Button, Grid } from "@mui/material";
import TextInput from "../formComponents/TextInput";
import RadioButton from "../formComponents/RadioButton";
import { UserFormComponentParams } from "../../types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validations = Yup.object().shape({
  meatEstimationType: Yup.string().required("validation type is required"),
  beefMealsPerWeek: Yup.number().typeError("This must be a number"),
  lambMealsPerWeek: Yup.number().typeError("This must be a number"),
  porkMealsPerWeek: Yup.number().typeError("This must be a number"),
  chickenMealsPerWeek: Yup.number().typeError("This must be a number"),
  cheeseMealsPerWeek: Yup.number().typeError("This must be a number"),
  beefGramsPerWeek: Yup.number().typeError("This must be a number"),
  lambGramsPerWeek: Yup.number().typeError("This must be a number"),
  porkGramsPerWeek: Yup.number().typeError("This must be a number"),
  chickenGramsPerWeek: Yup.number().typeError("This must be a number"),
  cheeseGramsPerWeek: Yup.number().typeError("This must be a number"),
});

const MeatForm: React.FunctionComponent<UserFormComponentParams> = ({
  initialFormValues,
  saveChange,
}) => {
  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validations}
      onSubmit={saveChange}
    >
      {({ isSubmitting, values }) => {
        return (
          <Form>
            <Divider sx={{ marginTop: "1em", marginBottom: "1em" }} />
            <FormGroup sx={{ marginBottom: "1em" }}>
              <Grid container direction={"column"} spacing={2} padding={1}>
                <Field
                  name="meatEstimationType"
                  row
                  component={RadioButton}
                  options={[
                    { value: "meals", label: "Meal based" },
                    { value: "weight", label: "Weight" },
                  ]}
                />
                {(values.meatEstimationType === "meals" ||
                  values.meatEstimationType === undefined) && (
                  <>
                    <Field
                      name="beefMealsPerWeek"
                      label="Average number of meals per week containing beef"
                      hint="Where a meal contains about 100g of beef"
                      component={TextInput}
                    />
                    <Field
                      name="lambMealsPerWeek"
                      label="Average number of meals per week containing lamb"
                      hint="Where a meal contains about 100g of lamb"
                      component={TextInput}
                    />
                    <Field
                      name="porkMealsPerWeek"
                      label="Average number of meals per week containing pork"
                      hint="Where a meal contains about 100g of pork"
                      component={TextInput}
                    />
                    <Field
                      name="chickenMealsPerWeek"
                      label="Average number of meals per week containing chicken"
                      hint="Where a meal contains about 100g of chicken"
                      component={TextInput}
                    />
                    <Field
                      name="cheeseMealsPerWeek"
                      label="Average number of meals per week containing cheese"
                      hint="Where a meal contains about 50g of cheese"
                      component={TextInput}
                    />
                  </>
                )}
                {values.meatEstimationType === "weight" && (
                  <>
                    <Field
                      name="beefGramsPerWeek"
                      label="Beef consumed per week"
                      hint=""
                      suffix="grams"
                      component={TextInput}
                    />
                    <Field
                      name="lambGramsPerWeek"
                      label="Lamb consumed per week"
                      hint=""
                      suffix="grams"
                      component={TextInput}
                    />
                    <Field
                      name="porkGramsPerWeek"
                      label="Pork consumed per week"
                      hint=""
                      suffix="grams"
                      component={TextInput}
                    />
                    <Field
                      name="chickenGramsPerWeek"
                      label="Chicken consumed per week"
                      hint=""
                      suffix="grams"
                      component={TextInput}
                    />
                    <Field
                      name="cheeseGramsPerWeek"
                      label="Cheese consumed per week"
                      hint=""
                      suffix="grams"
                      component={TextInput}
                    />
                  </>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  Update
                </Button>
              </Grid>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MeatForm;
