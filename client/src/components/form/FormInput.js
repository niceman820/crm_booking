import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// ? Styled Material UI TextField Component
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: '#009EF7'
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    padding: 0,
    '&:hover fieldset': {
      borderColor: '#E4E6EF',
    },
    "&.Mui-focused fieldset": {
      borderColor: '#009EF7'
    }
  },
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: "#000",
    color: "#000"
  },
});

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
      // rules={{ required: true }}
      render={({ field }) => (
        <CssTextField
          {...field}
          {...otherProps}
          variant='outlined'
          sx={{ mt: '1.5rem' }}
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name].message) : ''
          }
          // {...register(name)}
          inputProps={{
            style: {
              height: '2.5rem',
              padding: '0 10px',
            },
            sx: {
              "&::placeholder": {
                fontWeight: 600,
                fontSize: '0.8rem',
                opacity: 0.6
              }
            }
          }}
        />
      )}
    />
  );
};

export default FormInput;