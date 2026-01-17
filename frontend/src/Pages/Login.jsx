
import * as React from "react";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";


const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  position: "relative",       
  width: "100vw",
  height: "100vh",            
  minHeight: "100%",
  padding: theme.spacing(2),
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)",
}));


export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await login({ email, password });
      alert("Login exitoso"); 
      navigate('/');
    } catch (err) {
      console.error("Error en login:", err);
      setErrorMessage("Correo o contraseña incorrectos");
    }

    setLoading(false);
  };

  return (
    <SignInContainer>
      <CssBaseline />
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", textAlign: "center", mb: 3 }}
        >
          Iniciar Sesión
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <FormLabel htmlFor="email">Correo electrónico</FormLabel>
            <TextField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <TextField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete="current-password"
              required
            />
          </FormControl>

          {errorMessage && (
            <Typography color="error" sx={{ textAlign: "center" }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              py: 1.5,
              mt: 1,
              fontWeight: "bold",
              transition: "all 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            {loading ? "Cargando..." : "Entrar"}
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
