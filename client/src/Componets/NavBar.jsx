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
  Menu,
  MenuItem,
  Collapse,
  Popper,
  Paper,
  ClickAwayListener,
  Grow,
  MenuList,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useRecoilState } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isNewRequrimentRequestAtom } from "../Atoms/isNewRequrimentRequestAtom";
import logo from "../img/image.png";

const drawerWidth = 240;

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [user, setUser] = useRecoilState(userAtom);
  const [isNewRequrimentRequest] = useRecoilState(isNewRequrimentRequestAtom);
  
  // State for product dropdown menu
  const [productMenuOpen, setProductMenuOpen] = React.useState(false);
  const [hardwareMenuOpen, setHardwareMenuOpen] = React.useState(false);
  const productButtonRef = React.useRef(null);
  const hardwareButtonRef = React.useRef(null);
  
  // State for mobile product dropdown
  const [mobileProductOpen, setMobileProductOpen] = React.useState(false);
  const [mobileHardwareOpen, setMobileHardwareOpen] = React.useState(false);
  
  // Lazy loading state for categories
  const [categoriesLoaded, setCategoriesLoaded] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProductMenuOpen = () => {
    setProductMenuOpen(true);
    // Lazy load categories data if not already loaded
    if (!categoriesLoaded) {
      setCategoriesLoaded(true);
    }
  };

  const handleProductMenuClose = () => {
    setProductMenuOpen(false);
    // Keep hardware menu closed when product menu closes
    setHardwareMenuOpen(false);
  };

  const handleHardwareMouseEnter = (event) => {
    hardwareButtonRef.current = event.currentTarget;
    setHardwareMenuOpen(true);
  };

  const handleHardwareMouseLeave = () => {
    // Small delay to allow moving mouse to submenu
    setTimeout(() => {
      setHardwareMenuOpen(false);
    }, 100);
  };

  const handleMobileProductToggle = () => {
    setMobileProductOpen(!mobileProductOpen);
  };

  const handleMobileHardwareToggle = (event) => {
    event.stopPropagation();
    setMobileHardwareOpen(!mobileHardwareOpen);
  };

  const navigateToCategory = (path) => {
    navigate(path);
    handleProductMenuClose();
    setMobileOpen(false);
  };

  const productCategories = [
    { label: "Pression Parts", path: "/products/pression-parts" },
    { label: "Sanitaire Bath Parts", path: "/products/sanitaire-bath-parts" },
    { 
      label: "Hardware Parts", 
      path: "/products/hardware-parts",
      isSubmenu: true,
      subCategories: [
        { label: "Asses Parts", path: "/products/hardware-parts/asses-parts" },
        { label: "Aluminium Parts", path: "/products/hardware-parts/aluminium-parts" },
        { label: "Brass Parts", path: "/products/hardware-parts/brass-parts" },
      ]
    },
    { label: "Other Parts", path: "/products/other-parts" },
  ];

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Products", path: "/products", hasDropdown: true },
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
    <Box onClick={(e) => e.target.type !== 'button' && handleDrawerToggle()} sx={{ textAlign: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: "4.4em", marginBottom: '4px' }} />
        </Link>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'black' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          item.label === "Products" ? (
            <React.Fragment key={item.label}>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => {
                    handleMobileProductToggle();
                    if (!categoriesLoaded) setCategoriesLoaded(true);
                  }}
                  sx={{ 
                    textAlign: "center",
                    justifyContent: "space-between",
                    color: mobileProductOpen ? "#1976d2" : "black",
                  }}
                >
                  <ListItemText primary={item.label} />
                  {mobileProductOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
              </ListItem>
              <Collapse in={mobileProductOpen} timeout="auto" unmountOnExit>
                {categoriesLoaded && (
                <List component="div" disablePadding>
                  {productCategories.map((category) => (
                    category.isSubmenu ? (
                      <React.Fragment key={category.label}>
                        <ListItem disablePadding>
                          <ListItemButton 
                            onClick={handleMobileHardwareToggle}
                            sx={{ 
                              pl: 4, 
                              textAlign: "center",
                              justifyContent: "space-between",
                              color: mobileHardwareOpen ? "#1976d2" : "black",
                            }}
                          >
                            <ListItemText primary={category.label} />
                            {mobileHardwareOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </ListItemButton>
                        </ListItem>
                        <Collapse in={mobileHardwareOpen} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {category.subCategories.map((subCategory) => (
                              <ListItem key={subCategory.label} disablePadding>
                                <ListItemButton 
                                  sx={{ pl: 8, textAlign: "center" }}
                                  onClick={() => navigateToCategory(subCategory.path)}
                                >
                                  <ListItemText primary={subCategory.label} />
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      </React.Fragment>
                    ) : (
                      <ListItem key={category.label} disablePadding>
                        <ListItemButton 
                          sx={{ pl: 4, textAlign: "center" }}
                          onClick={() => navigateToCategory(category.path)}
                        >
                          <ListItemText primary={category.label} />
                        </ListItemButton>
                      </ListItem>
                    )
                  ))}
                </List>
                )}
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItem key={item.label} disablePadding>
              <ListItemButton 
                sx={{ 
                  textAlign: "center",
                  color: location.pathname === item.path ? "#1976d2" : "black",
                }} 
                onClick={() => navigate(item.path)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          )
        ))}
        {adminItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton 
              sx={{ 
                textAlign: "center",
                color: location.pathname === item.path ? "#1976d2" : "black",
              }} 
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={item.label} />
              {item.badge && <div className="bg-red-500 rounded-full h-2 w-2 ml-1"></div>}
            </ListItemButton>
          </ListItem>
        ))}
      
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
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <div key={item.label}>
                    <Button
                      ref={productButtonRef}
                      aria-controls={productMenuOpen ? 'product-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={productMenuOpen ? 'true' : undefined}
                      onMouseEnter={handleProductMenuOpen}
                      onClick={() => navigate(item.path)}
                      endIcon={<ExpandMoreIcon />}
                      sx={{
                        color: location.pathname === item.path || location.pathname.includes('/products/') ? "#1976d2" : "black",
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
                      {item.label}
                    </Button>
                    <Popper
                      open={productMenuOpen}
                      anchorEl={productButtonRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                      onMouseLeave={handleProductMenuClose}
                      style={{ zIndex: 1300 }}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: placement === 'bottom-start' ? 'top left' : 'top right',
                          }}
                        >
                          <Paper
                            sx={{
                              backgroundColor: "#f6f3e7",
                              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                              minWidth: '200px',
                            }}
                          >
                            <ClickAwayListener onClickAway={handleProductMenuClose}>
                              <MenuList autoFocusItem={productMenuOpen} id="product-menu">
                                {productCategories.map((category) => (
                                  category.isSubmenu ? (
                                    <div key={category.label} 
                                  onMouseEnter={handleHardwareMouseEnter}
                                  onMouseLeave={handleHardwareMouseLeave}
                                >
                                      <MenuItem 
                                        onClick={() => navigateToCategory(category.path)}
                                        sx={{
                                          color: location.pathname.includes(category.path) ? "#1976d2" : "black",
                                          position: 'relative',
                                          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          padding: '8px 16px',
                                        }}
                                      >
                                        {category.label}
                                        <ExpandMoreIcon fontSize="small" />
                                      </MenuItem>
                                      <Popper
                                        open={hardwareMenuOpen}
                                        anchorEl={productButtonRef.current}
                                        role={undefined}
                                        placement="right-start"
                                        transition
                                        style={{ zIndex: 1400 }}
                                      >
                                        {({ TransitionProps }) => (
                                          <Grow {...TransitionProps} style={{ transformOrigin: 'left center' }}>
                                            <Paper
                                              sx={{
                                                backgroundColor: "#f6f3e7",
                                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                                minWidth: '180px',
                                                marginLeft: '8px',
                                              }}
                                            >
                                              <MenuList>
                                                {category.subCategories.map((subCategory) => (
                                                  <MenuItem 
                                                    key={subCategory.label} 
                                                    onClick={() => navigateToCategory(subCategory.path)}
                                                    sx={{
                                                      color: location.pathname === subCategory.path ? "#1976d2" : "black",
                                                      padding: '8px 16px',
                                                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                                                    }}
                                                  >
                                                    {subCategory.label}
                                                  </MenuItem>
                                                ))}
                                              </MenuList>
                                            </Paper>
                                          </Grow>
                                        )}
                                      </Popper>
                                    </div>
                                  ) : (
                                    <MenuItem 
                                      key={category.label} 
                                      onClick={() => navigateToCategory(category.path)}
                                      sx={{
                                        color: location.pathname === category.path ? "#1976d2" : "black",
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                                        padding: '8px 16px',
                                      }}
                                    >
                                      {category.label}
                                    </MenuItem>
                                  )
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                ) : (
                  <Button
                    key={item.label}
                    variant="text"
                    sx={{
                      color: location.pathname === item.path ? "#1976d2" : "black",
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
                )
              ))}
              {adminItems.map((item) => (
                <Button
                  key={item.label}
                  variant="text"
                  sx={{
                    color: location.pathname === item.path ? "#1976d2" : "black",
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
                  {item.badge && <div className="bg-red-500 rounded-full h-2 w-2 ml-1"></div>}
                </Button>
              ))}
            
            </Box>
            <IconButton 
              aria-label="toggle drawer" 
              edge="end" 
              onClick={handleDrawerToggle} 
              sx={{ display: { sm: "none" }, color: "black" }}
            >
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
      <Box sx={{ height: { xs: "75px", sm: "100px" } }} />
    </Box>
  );
}

NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar;
