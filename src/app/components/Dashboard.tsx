"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Topic } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Grid, Paper } from "@mui/material";
import OutlinedCard from "../components/Card";
import { useTheme } from "@mui/material";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Orders from "../components/Orders";
const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Dashboard(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const router = useRouter();
  const palette = ["#ff9800", "#4caf50", "#e53935", "#42a5f5"];
  const palette1 = ["blue", "teal", "red"];
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const theme = useTheme();
  const drawer = (
    <div>
      <Toolbar />

      <Divider />
      <Typography variant="h6" style={{ padding: 10 }}>
        Dashboards
      </Typography>
      <List>
        <ListItem button onClick={() => router.push("/dashboard")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem button onClick={() => router.push("/dashboard/analytics")}>
          <ListItemIcon>
            <PieChartOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem button onClick={() => router.push("/dashboard/products")}>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText primary="E-commerce" />
        </ListItem>
        <ListItem button onClick={() => router.push("/dashboard/products")}>
          <ListItemIcon>
            <Topic />
          </ListItemIcon>
          <ListItemText primary="File" />
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h6" style={{ padding: 10 }}>
        General
      </Typography>
      <List>
        <ListItem button onClick={() => router.push("/dashboard/products")}>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={() => router.push("/dashboard/products")}>
          <ListItemIcon>
            <Topic />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <Topic />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => router.push("/dashboard/products")}
            >
              <ul>
                <li>
                  <ListItemText primary="List" />
                </li>
              </ul>
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => router.push("/dashboard/createproduct")}
            >
              <ul>
                <li>
                  <ListItemText primary="Create" />
                </li>
              </ul>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItem button onClick={() => router.push("/dashboard/category")}>
          <ListItemIcon>
            <Topic />
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItem>
        <ListItem button onClick={() => router.push("/dashboard/category")}>
          <ListItemIcon>
            <Topic />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button onClick={() => router.push("/dashboard")}>
          <ListItemIcon>
            <Topic />
          </ListItemIcon>
          <ListItemText primary="Invoices" />
        </ListItem>
        <ListItem button onClick={() => router.push("/dashboard")}>
          <ListItemIcon>
            <Topic />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: "#ffebee" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Grid container>
          <Grid item xs={8}>
            <OutlinedCard />
          </Grid>
        </Grid>
        <Grid container style={{ padding: 30 }}>
          <Grid item xs={6}>
            <Typography variant="h6">Area Installed</Typography>
            <BarChart
              xAxis={[
                { scaleType: "band", data: ["Asia", "America", "Australia"] },
              ]}
              series={[
                { data: [4, 3, 5] },
                { data: [1, 6, 3] },
                { data: [2, 5, 6] },
              ]}
              width={500}
              height={300}
              colors={palette1}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Current Download</Typography>
            <PieChart
              colors={palette}
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Mac" },
                    { id: 1, value: 25, label: "Window" },
                    { id: 2, value: 20, label: "Android" },
                    { id: 3, value: 15, label: "IOS" },
                  ],
                },
              ]}
              width={600}
              height={400}
            />
          </Grid>
        </Grid>
        <Orders />
      </Box>
    </Box>
  );
}
