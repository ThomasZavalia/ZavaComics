

import { Link, useSearchParams } from "react-router-dom"; 
import { AppBar, Toolbar, Typography, Button, Stack, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../Hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams(); 
  const query = searchParams.get('q') || ''; 

  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      searchParams.set('q', value);
    } else {
      searchParams.delete('q'); // Limpia si vacío
    }
    setSearchParams(searchParams);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#1e1e1e", // gris oscuro
        px: 3,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        {/* Logo */}
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

       
        <TextField
          variant="outlined"
          placeholder="Buscar cómics por título..."
          value={query}
          onChange={handleSearchChange}
          size="small"
          sx={{
            minWidth: { xs: '200px', sm: '300px' }, 
            maxWidth: '400px',
            mx: 2, // Margen horizontal
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#2c2c2c',
              color: 'white',
              borderRadius: 2,
              '& fieldset': { borderColor: '#444' },
              '&:hover fieldset': { borderColor: '#555' },
            },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputBase-input': { color: 'white' },
            '& .MuiSvgIcon-root': { color: 'white' },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Botones de navegación (sin Admin) */}
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
          {["Home", "Libreria"].map((page) => { 
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