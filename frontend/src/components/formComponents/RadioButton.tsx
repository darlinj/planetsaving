import React, {ReactNode} from "react";
import {FormControlLabel, Grid, Radio, RadioGroup} from "@mui/material";
import {FieldProps} from "formik";

interface ExtraTextParams {
  options: {value: string; label: string | ReactNode}[];
}

const RadioButton: React.FC<ExtraTextParams & FieldProps> = ({
  field,
  ...props
}) => {
  return (
    <Grid item xs={12}>
      <RadioGroup {...field} {...props} row>
        {props.options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </Grid>
  );
};

export default RadioButton;
