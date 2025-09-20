import { Link } from "react-router-dom";

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
