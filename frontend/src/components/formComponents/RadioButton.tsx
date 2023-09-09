import React, {ReactNode} from "react";
import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import {FieldProps} from "formik";

interface ExtraTextParams {
  options: {value: string; label: string | ReactNode}[];
  row: boolean;
  label: string;
}

const RadioButton: React.FC<ExtraTextParams & FieldProps> = ({
  field,
  ...props
}) => {
  return (
    <Grid item xs={12}>
      <FormGroup>
        <FormLabel id={field.name}>{props.label}</FormLabel>
        <RadioGroup
          id={field.name}
          aria-labelledby={field.name}
          {...field}
          {...props}
        >
          {props.options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormGroup>
    </Grid>
  );
};

export default RadioButton;
