/*import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>ZavaComics</h2>
      <ul style={styles.menu}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/libreria">Libreria</Link></li>
        <li><Link to="/admin">Admin Panel</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#222",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  menu: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
};

export default Navbar;
*/

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
