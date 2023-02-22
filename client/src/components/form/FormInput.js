import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const FormInput = ({ name, handleChange, ...otherProps }) => {
  // ? Utilizing useFormContext to have access to the form Context
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          {...otherProps}
          variant="standard"
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name].message) : ''
          }
          InputProps={{
            disableUnderline: true,
            style: {
              padding: '8px 20px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
            },
          }}
        />
      )}
    />
  );
};

export default FormInput;