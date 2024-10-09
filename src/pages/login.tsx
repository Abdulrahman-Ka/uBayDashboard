/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { Resolver, useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "Email required",
          },
        }
      : {},
  };
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "0.2em",
        }}
      >
        <img src="" alt="" style={{ height: "0.8em", marginLeft: "0.5em" }} />
        <Typography variant="h2" component="h2">
          uBay
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "25ch",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Typography variant="h4" component="h4" sx={{ mb: 3 }}>
          Login
        </Typography>
        <TextField
          {...register("email")}
          id="email"
          label="Email"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        {errors?.email && <p>{errors.email.message}</p>}
        <TextField
          id="password"
          label="password"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
