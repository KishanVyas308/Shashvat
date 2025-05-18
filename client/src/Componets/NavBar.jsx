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
          sx={{ height: "4em", width: "7em", mt: 1, mb: 1 }}
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
        {user === null ? (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate("/login")}
            >
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => setUser(null)}
            >
              <ListItemText primary="Log-Out" />
            </ListItemButton>
          </ListItem>
        )}

        {user !== null && user.isAdmin && (
          <>
            <Divider />
            <Typography
              sx={{
                bgcolor: "white",
                padding: "10px",
              }}
            >
              Admin
            </Typography>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/admin/manage-products")}
              >
                <ListItemText primary="Manage Products" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/admin/customer-reviews")}
              >
                <ListItemText primary="Reviews" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/admin/client-requirements")}
              >
                <ListItemText primary="Requests" />
                {isNewRequrimentRequest && (
                  <div className="bg-red-500 rounded-full mb-4 h-2 w-2 ml-1"></div>
                )}
              </ListItemButton>
            </ListItem>
          </>
        )}
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
        <AppBar component="nav" sx={{ bgcolor: "#f6f3e7" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
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
              {user !== null && user.isAdmin && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  <Box
                    sx={{
                      display: { xs: "none", sm: "flex" },
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="text"
                      sx={{ color: "black", margin: "5px" }}
                      onClick={() => navigate("/admin/manage-products")}
                    >
                      Manage Products
                    </Button>
                    <Button
                      variant="text"
                      sx={{ color: "black", margin: "5px" }}
                      onClick={() => navigate("/admin/customer-reviews")}
                    >
                      Reviews
                    </Button>
                    <Button
                      variant="text"
                      sx={{ color: "black", margin: "5px" }}
                      onClick={() => navigate("/admin/client-requirements")}
                    >
                      Requests
                      {isNewRequrimentRequest && (
                        <div className="bg-red-500 rounded-full mb-4 h-2 w-2 ml-1"></div>
                      )}
                    </Button>
                  </Box>
                </>
              )}
            </Stack>
            
            <IconButton
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" }, color: "black" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <nav>
        <Drawer
          container={container}
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
      </nav>
    </Box>
  );
}

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar;
