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
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { allCategoriesAtom } from "../Atoms/categories";
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
  const isNewRequrimentRequest = useRecoilValue(isNewRequrimentRequestAtom);
  const allCategories = useRecoilValue(allCategoriesAtom);
  
  // State for desktop dropdown menus
  const [productMenuOpen, setProductMenuOpen] = React.useState(false);
  const [submenuStates, setSubmenuStates] = React.useState({});
  const productButtonRef = React.useRef(null);
  const submenuRefs = React.useRef({});
  
  // State for mobile dropdown menus
  const [mobileProductOpen, setMobileProductOpen] = React.useState(false);
  const [mobileSubmenuStates, setMobileSubmenuStates] = React.useState({});
  
  // Loading state for categories
  const [isLoadingCategories, setIsLoadingCategories] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProductMenuOpen = () => {
    setProductMenuOpen(true);
  };

  const handleProductMenuClose = () => {
    setProductMenuOpen(false);
    // Close all submenus when main menu closes
    setSubmenuStates({});
  };

  const handleSubmenuMouseEnter = (categoryId, event) => {
    submenuRefs.current[categoryId] = event.currentTarget;
    setSubmenuStates(prev => ({ ...prev, [categoryId]: true }));
  };

  const handleSubmenuMouseLeave = (categoryId) => {
    // Small delay to allow moving mouse to submenu
    setTimeout(() => {
      setSubmenuStates(prev => ({ ...prev, [categoryId]: false }));
    }, 150);
  };

  const handleMobileProductToggle = () => {
    setMobileProductOpen(!mobileProductOpen);
  };

  const handleMobileSubmenuToggle = (categoryId, event) => {
    event.stopPropagation();
    setMobileSubmenuStates(prev => ({ 
      ...prev, 
      [categoryId]: !prev[categoryId] 
    }));
  };

  const navigateToCategory = (path) => {
    navigate(path);
    handleProductMenuClose();
    setMobileOpen(false);
  };

  // Helper function to generate URL-friendly slug
  const createSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  // Helper function to generate category path
  const generateCategoryPath = (category) => {
    const slug = createSlug(category.name);
    return `/products/${slug}`;
  };

  // Helper function to generate subcategory path
  const generateSubcategoryPath = (category, subcategory) => {
    const categorySlug = createSlug(category.name);
    const subcategorySlug = createSlug(subcategory.name);
    return `/products/${categorySlug}/${subcategorySlug}`;
  };

  // Convert dynamic categories to the format expected by the navbar
  const productCategories = React.useMemo(() => {
    // Return empty array if no categories available
    if (!allCategories || !Array.isArray(allCategories) || allCategories.length === 0) {
      return [];
    }

    return allCategories
      .filter(category => category && category.name) // Filter out invalid categories
      .map(category => {
        const categoryPath = generateCategoryPath(category);
        const categoryId = category.id || category._id || category.name;
        
        // Check if category has valid subcategories
        const hasSubcategories = category.subcategories && 
                                Array.isArray(category.subcategories) && 
                                category.subcategories.length > 0;
        
        if (hasSubcategories) {
          return {
            id: categoryId,
            label: category.name,
            path: categoryPath,
            isSubmenu: true,
            subCategories: category.subcategories
              .filter(subcategory => subcategory && subcategory.name) // Filter out invalid subcategories
              .map(subcategory => ({
                id: subcategory.id || subcategory._id || subcategory.name,
                label: subcategory.name,
                path: generateSubcategoryPath(category, subcategory)
              }))
          };
        } else {
          return {
            id: categoryId,
            label: category.name,
            path: categoryPath,
            isSubmenu: false
          };
        }
      });
  }, [allCategories]);

  // Check if we're currently on a products page to highlight the Products button
  const isOnProductsPage = location.pathname === '/products' || location.pathname.startsWith('/products/');

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

  // Desktop dropdown menu content
  const renderDesktopDropdownMenu = () => (
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
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            <ClickAwayListener onClickAway={handleProductMenuClose}>
              <MenuList autoFocusItem={productMenuOpen} id="product-menu">
                {isLoadingCategories ? (
                  <MenuItem disabled sx={{ justifyContent: 'center', py: 2 }}>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : productCategories.length > 0 ? (
                  productCategories.map((category) => (
                    category.isSubmenu ? (
                      <div 
                        key={category.id} 
                        onMouseEnter={(e) => handleSubmenuMouseEnter(category.id, e)}
                        onMouseLeave={() => handleSubmenuMouseLeave(category.id)}
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
                          open={submenuStates[category.id] || false}
                          anchorEl={submenuRefs.current[category.id]}
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
                                  maxHeight: '300px',
                                  overflowY: 'auto',
                                }}
                              >
                                <MenuList>
                                  {category.subCategories.map((subCategory) => (
                                    <MenuItem 
                                      key={subCategory.id} 
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
                        key={category.id} 
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
                  ))
                ) : (
                  <MenuItem disabled sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    No categories available
                  </MenuItem>
                )}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  // Mobile dropdown content
  const renderMobileProductsSection = () => (
    <React.Fragment>
      <ListItem disablePadding>
        <ListItemButton 
          onClick={handleMobileProductToggle}
          sx={{ 
            textAlign: "center",
            justifyContent: "space-between",
            color: mobileProductOpen ? "#1976d2" : "black",
          }}
        >
          <ListItemText primary="Products" />
          {mobileProductOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={mobileProductOpen} timeout="auto" unmountOnExit>
        {isLoadingCategories ? (
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4, textAlign: "center", justifyContent: "center" }} disabled>
                <CircularProgress size={20} />
              </ListItemButton>
            </ListItem>
          </List>
        ) : productCategories.length > 0 ? (
          <List component="div" disablePadding>
            {productCategories.map((category) => (
              category.isSubmenu ? (
                <React.Fragment key={category.id}>
                  <ListItem disablePadding>
                    <ListItemButton 
                      onClick={(e) => handleMobileSubmenuToggle(category.id, e)}
                      sx={{ 
                        pl: 4, 
                        textAlign: "center",
                        justifyContent: "space-between",
                        color: mobileSubmenuStates[category.id] ? "#1976d2" : "black",
                      }}
                    >
                      <ListItemText primary={category.label} />
                      {mobileSubmenuStates[category.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={mobileSubmenuStates[category.id]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {category.subCategories.map((subCategory) => (
                        <ListItem key={subCategory.id} disablePadding>
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
                <ListItem key={category.id} disablePadding>
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
        ) : (
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4, textAlign: "center" }} disabled>
                <ListItemText 
                  primary="No categories available" 
                  sx={{ color: 'text.secondary', fontStyle: 'italic' }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Collapse>
    </React.Fragment>
  );

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
          item.hasDropdown ? renderMobileProductsSection() : (
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
        <ListItem disablePadding>
          <ListItemButton 
            sx={{ 
              textAlign: "center",
              color: location.pathname === '/login' ? "#1976d2" : "black",
            }} 
            onClick={() => (user ? setUser(null) : navigate("/login"))}
          >
            <ListItemText primary={user ? "Log-Out" : "Login"} />
          </ListItemButton>
        </ListItem>
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
              style={{ 
                height: isMobile ? "4.4em" : isTablet ? "4.4em" : "5.5em", 
                objectFit: "contain", 
                marginTop: "3px" 
              }}
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
                        color: isOnProductsPage ? "#1976d2" : "black",
                        margin: "5px",
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        whiteSpace: "nowrap",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          width: isOnProductsPage ? "100%" : "0%",
                          height: "2px",
                          bottom: 0,
                          left: isOnProductsPage ? 0 : "50%",
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
                    {renderDesktopDropdownMenu()}
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
                        width: location.pathname === item.path ? "100%" : "0%",
                        height: "2px",
                        bottom: 0,
                        left: location.pathname === item.path ? 0 : "50%",
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
                      width: location.pathname === item.path ? "100%" : "0%",
                      height: "2px",
                      bottom: 0,
                      left: location.pathname === item.path ? 0 : "50%",
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
              <Button 
                onClick={() => (user ? setUser(null) : navigate("/login"))} 
                sx={{
                  color: location.pathname === '/login' ? "#1976d2" : "black",
                  margin: "5px",
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  whiteSpace: "nowrap",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: location.pathname === '/login' ? "100%" : "0%",
                    height: "2px",
                    bottom: 0,
                    left: location.pathname === '/login' ? 0 : "50%",
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