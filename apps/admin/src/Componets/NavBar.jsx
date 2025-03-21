"use client";

import * as React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { isNewRequrimentRequestAtom } from "../Atoms/isNewRequrimentRequestAtom";
import logo from "../img/image.png";

const drawerWidth = 240;

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [user, setUser] = useRecoilState(userAtom);
  const [isNewRequrimentRequest] = useRecoilState(isNewRequrimentRequestAtom);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Products", path: "/products" },
    { label: "Contact Us", path: "/contact" },
  ];

  const adminItems = user?.isAdmin
    ? [
        { label: "Manage Products", path: "/admin/manage-products" },
        { label: "Reviews", path: "/admin/customer-reviews" },
        { label: "Requests", path: "/admin/client-requirements", badge: isNewRequrimentRequest },
      ]
    : [];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 5 }}>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: "4.4em" , marginBottom:'4px'}} />
        </Link>
      </Box>
      <Divider />
      <List>
        {[...navItems, ...adminItems].map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={() => navigate(item.path)}>
              <ListItemText primary={item.label} />
              {item.badge && <div className="bg-red-500 rounded-full h-2 w-2 ml-1"></div>}
            </ListItemButton>
          </ListItem>
        ))}
        {isMobile && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={() => (user ? setUser(null) : navigate("/login"))}>
              <ListItemText primary={user ? "Log-Out" : "Login"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "#f6f3e7" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ height: isMobile ? "4.4em" : isTablet ? "4.4em" : "5.5em", objectFit: "contain", marginTop: "3px" }}
            />
          </Link>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box sx={{ display: { xs: "none", sm: "flex" }, color: "black" }}>
              {[...navItems, ...adminItems].map((item) => (
                <Button
                  key={item.label}
                  variant="text"
                  sx={{
                    color: "black",
                    margin: "5px",
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    whiteSpace: "nowrap",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "0%",
                      height: "2px",
                      bottom: 0,
                      left: "50%",
                      backgroundColor: "black",
                      transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
                    },
                    "&:hover::after": {
                      width: "100%",
                      left: 0,
                    },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              ))}
              <Button onClick={() => (user ? setUser(null) : navigate("/login"))} 
               sx={{
                color: "black",
                margin: "5px",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                whiteSpace: "nowrap",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "0%",
                  height: "2px",
                  bottom: 0,
                  left: "50%",
                  backgroundColor: "black",
                  transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
                },
                "&:hover::after": {
                  width: "100%",
                  left: 0,
                },
              }}
              >
                {user ? "Log-Out" : "Login"}
              </Button>
            </Box>
            <IconButton aria-label="toggle drawer" edge="end" onClick={handleDrawerToggle} sx={{ display: { sm: "none" }, color: "black" }}>
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#f6f3e7",
            color: "black",
            boxSizing: "border-box",
            border: "none",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box sx={{ height: { xs: "50px", sm: "100px" } }} />
    </Box>
  );
}

NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar;
