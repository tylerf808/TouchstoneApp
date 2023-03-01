import { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";

export default function SignUp({ signUp, loggedIn, setLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/addjob')
    }
  })

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1vh'}}>
      <Typography sx={{ marginBottom: 2 }} variant="h4">Create an Account</Typography>
      <Container
        sx={{
          marginTop: '2vh', display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: 'white', width: '400px',
          borderRadius: 3, border: 1
        }}>

        <Typography sx={{margin: '1vh'}}>Email</Typography>
        <TextField id="email-signup"></TextField>
        <Typography sx={{margin: '1vh'}}>Password</Typography>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            id="password-signup"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button sx={{color: '#DAA044', marginTop: '1vh'}} onClick={signUp}>Sign Up</Button>
        </FormControl>
      </Container>
    </Container>
  );
}
