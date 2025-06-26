import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import {Snackbar} from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState();
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();

  const [fromState, setFromState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (fromState === 0) {
        let result = await handleLogin(username,password);
      }
      if (fromState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setUsername("")
        setMessage(result);
        setOpen(true);
        setError("");
        setFromState(0);
        setPassword("");
      }
    } catch (err) {
      let message = (err.response.data.message);
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ padding: "0 20vw" }}>
        <div
          style={{
            marginTop: "20vh",
            marginBottom: "5vh",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant={fromState === 0 ? "contained" : ""}
              onClick={() => {
                setFromState(0);
              }}
            >
              sign in
            </Button>
            <Button
              variant={fromState === 1 ? "contained" : ""}
              onClick={() => {
                setFromState(1);
              }}
            >
              sign up
            </Button>
          </div>
        </div>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {fromState === 1 ? (
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Full Name"
              name="username"
              autoFocus
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          ) : (
            <></>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={password}
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <p style={{ color: "red" }}>{error}</p>

          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAuth}
          >
            {fromState === 0 ? "Log In" : "register"}
          </Button>
        </Box>
      </div>

      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}
