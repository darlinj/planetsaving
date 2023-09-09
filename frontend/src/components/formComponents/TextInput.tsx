import React from "react";
import {Grid, InputAdornment, TextField} from "@mui/material";
import {FieldProps} from "formik";

interface ExtraTextParams {
  hint?: string;
  suffix?: string;
}

const TextInput: React.FC<ExtraTextParams & FieldProps> = ({
  field,
  form: {touched, errors},
  ...props
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        variant="outlined"
        error={!!(touched[field.name] && errors[field.name])}
        helperText={
          errors[field.name] ? (errors[field.name] as string) : props.hint
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{props.suffix}</InputAdornment>
          ),
        }}
        {...field}
        {...props}
      />
    </Grid>
  );
};

export default TextInput;
