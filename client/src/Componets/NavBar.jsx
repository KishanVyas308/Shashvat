import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { isNewRequrimentRequestAtom } from "../Atoms/isNewRequrimentRequestAtom";
import { Badge } from "antd";
import image from "../img/image.png";
import { Slide, Stack, useScrollTrigger } from "@mui/material";

const drawerWidth = 240;

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userAtom);
  const [isNewRequrimentRequest, setIsNewRequrimentRequest] = useRecoilState(
    isNewRequrimentRequestAtom
  );

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link to={"/"}>
        <Typography
          component="img"
          src={image}
          alt="Logo"
          sx={{ height: "5em", width: "7em", mt: 1, mb: 1 }}
        />
      </Link>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate("/")}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate("/about")}
          >
            <ListItemText primary="About Us" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate("/products")}
          >
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate("/contact")}
          >
            <ListItemText primary="Contact Us" />
          </ListItemButton>
        </ListItem>
       

      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ height: { xs: "50px", sm: "100px" } }}></Box>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar component="nav" sx={{ bgcolor: "white" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <Link to={"/"}>
              <Typography
                component="img"
                src={image}
                alt="Logo"
                sx={{
                  height: "5em",
                  width: "7em",
                  display: { xs: "none", sm: "block" },
                  mt: 1,
                  mb: 1,
                }}
              />
            </Link>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  color: "black",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="text"
                  sx={{ color: "black", margin: "5px" }}
                  onClick={() => navigate("/")}
                >
                  Home
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "black", margin: "5px" }}
                  onClick={() => navigate("/about")}
                >
                  About Us
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "black", margin: "5px" }}
                  onClick={() => navigate("/products")}
                >
                  Products
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "black", margin: "5px" }}
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                </Button>
             
              </Box>
             
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",

              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
            {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar;

