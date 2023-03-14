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

export default function SignUp({ signUp, loggedIn }) {
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
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Typography variant='h3' sx={{ marginTop: 4, marginBottom: 1 }}>Create an Account</Typography>
      </div>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1vh' }}>
        <Container
          sx={{
            marginTop: '2vh', display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: 'white', width: '400px',
            borderRadius: 3, border: 1
          }}>
          <div style={{ width: '60' }}>
            <Typography sx={{ alignSelf: 'flex-start', marginTop: 3 }}>Email:</Typography>
            <TextField sx={{ width: '100%' }} id="email-signup"></TextField>
            <Typography sx={{ alignSelf: 'flex-start', marginTop: 2 }}>Password:</Typography>
            <OutlinedInput
              sx={{ width: '100%' }}
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
            <Typography sx={{ alignSelf: 'flex-start', marginTop: 2 }}>Confirm Password:</Typography>
            <OutlinedInput
              sx={{ width: '100%' }}
              id="password-signup-conf"
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
          </div>
          <Button sx={{ color: '#DAA044', margin: 2 }} onClick={signUp}>Sign Up</Button>
        </Container>
        <div>
          <Typography sx={{ margin: 2 }}>Already have an account? <Link to='/'>Log in here!</Link></Typography>
        </div>
      </Container>
    </>
  );
}
