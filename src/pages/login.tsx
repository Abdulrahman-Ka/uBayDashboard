/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Resolver, useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import logo from "../assets/logo.svg";

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
        <img
          src={logo}
          alt="ubay logo"
          style={{ height: "15em", marginLeft: "0.5em", margin: "1em" }}
        />
        <Typography variant="h2" component="h2">
          uBay
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "40ch",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #6d28d9",
            borderRadius: "1em",
          },
          "& .MuiOutlinedInput-notchedOutline:focus": {
            borderColor: "#6d28d9",
          },
          "& .MuiOutlinedInput-inputMultiline": {
            color: "#6d28d9",
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
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained">Login</Button>
      </Box>
    </Box>
  );
}
