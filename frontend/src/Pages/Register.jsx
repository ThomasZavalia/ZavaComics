/*import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ nombre, email, password });
      alert("Usuario registrado con éxito");
    } catch (err) {
      console.error(err);
      alert("Error al registrar el usuario");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl w-96 flex flex-col items-center space-y-5 transition-transform transform hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Registrarse
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
};

export default Register;
*/
import * as React from "react";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";

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

// Card centralizado con sombra y padding
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  position: "relative",
  width: "100vw",
  height: "100vh",
  minHeight: "100%",
  padding: theme.spacing(2),
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)",
}));

export default function Register() {
  const { register } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await register({ nombre, email, password });
      alert("Usuario registrado con éxito"); // luego podrías redirigir a /login
    } catch (err) {
      console.error(err);
      setErrorMessage("Error al registrar el usuario");
    }

    setLoading(false);
  };

  return (
    <SignUpContainer>
      <CssBaseline />
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", textAlign: "center", mb: 3 }}
        >
          Crear Cuenta
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
            <FormLabel htmlFor="nombre">Nombre</FormLabel>
            <TextField
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
              required
            />
          </FormControl>

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
              autoComplete="new-password"
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
            {loading ? "Creando..." : "Crear cuenta"}
          </Button>
        </Box>
      </Card>
    </SignUpContainer>
  );
}
