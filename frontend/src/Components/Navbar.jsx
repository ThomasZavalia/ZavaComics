/*

import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "#1e1e1e", // gris oscuro
        px: 3,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            "&:hover": { color: "#f0f0f0", transform: "scale(1.05)" },
            transition: "all 0.3s",
          }}
        >
          ZavaComics
        </Typography>

        <Stack direction="row" spacing={2}>
          {["Home", "Libreria", "Admin"].map((page) => (
            <Button
              key={page}
              component={Link}
              to={`/${page.toLowerCase()}`}
              sx={{
                textTransform: "none",
                background: "#2c2c2c",
                color: "white",
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
                "&:hover": {
                  background: "#3a3a3a",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s",
              }}
            >
              {page}
            </Button>
          ))}
          {["Login", "Register"].map((page) => (
            <Button
              key={page}
              component={Link}
              to={`/${page.toLowerCase()}`}
              sx={{
                textTransform: "none",
                background: "#2c2c2c",
                color: "white",
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
                "&:hover": {
                  background: "#3a3a3a",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s",
              }}
            >
              {page}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
*/

import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { useAuth } from "../Hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <AppBar
      position="static"
      sx={{
        background: "#1e1e1e", // gris oscuro
        px: 3,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            "&:hover": { color: "#f0f0f0", transform: "scale(1.05)" },
            transition: "all 0.3s",
          }}
        >
          ZavaComics
        </Typography>

        <Stack direction="row" spacing={2}>
       {["Home", "Libreria", "Admin"].map((page) => {
  const path = page === "Home" ? "/" : `/${page.toLowerCase()}`;
  return (
    <Button
      key={page}
      component={Link}
      to={path}
      sx={{
        textTransform: "none",
        background: "#2c2c2c",
        color: "white",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
        "&:hover": {
          background: "#3a3a3a",
          transform: "scale(1.05)",
        },
        transition: "all 0.3s",
      }}
    >
      {page}
    </Button>
  );
})}

          {user ? (
            <Button
              onClick={logout}
              sx={{
                textTransform: "none",
                background: "#2c2c2c",
                color: "white",
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
                "&:hover": {
                  background: "#3a3a3a",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s",
              }}
            >
              Cerrar Sesión
            </Button>
          ) : (
            ["Login", "Register"].map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                sx={{
                  textTransform: "none",
                  background: "#2c2c2c",
                  color: "white",
                  borderRadius: 2,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
                  "&:hover": {
                    background: "#3a3a3a",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s",
                }}
              >
                {page}
              </Button>
            ))
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
