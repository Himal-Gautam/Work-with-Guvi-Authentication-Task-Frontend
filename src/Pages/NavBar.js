import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ListItemText from "@mui/material/ListItemText";
import SubjectIcon from "@mui/icons-material/Subject";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LinkIcon from "@mui/icons-material/Link";
import LogoutIcon from "@mui/icons-material/Logout";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { API } from "../global.js";

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await fetch(`${API}/users/logout`, {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    }).catch((err) => {
      console.log(err);
    });

    ReactSession.remove("token");
    ReactSession.remove("type");
    navigate("/login");
    window.close();
    window.open(window.location.href, "_blank");
  };
  return (
    <>
      {location.pathname === "/profile" ||
      location.pathname === "/password-reset" ? (
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">profile</Navbar.Brand>
            <Button variant="outline-success">LogOut</Button>
          </Container>
        </Navbar>
      ) : (
        <></>
      )}
    </>
  );
}

// function NavBar_() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const path = location.pathname.split("/");
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleLogout = async () => {
//     await fetch(`${API}/users/logout`, {
//       method: "POST",
//       headers: new Headers({
//         Authorization: "Bearer " + ReactSession.get("token"),
//         "Content-Type": "application/json; charset=UTF-8",
//       }),
//     }).catch((err) => {
//       console.log(err);
//     });

//     ReactSession.remove("token");
//     ReactSession.remove("type");
//     navigate("/login");
//     window.close();
//     window.open(window.location.href, "_blank");
//   };

//   const handleLogoutAll = async () => {
//     await fetch(`${API}/users/logoutAll`, {
//       method: "POST",
//       headers: new Headers({
//         Authorization: "Bearer " + ReactSession.get("token"),
//         "Content-Type": "application/json; charset=UTF-8",
//       }),
//     }).catch((err) => {
//       console.log(err);
//     });

//     ReactSession.remove("token");
//     ReactSession.remove("type");
//     navigate("/login");
//     window.close();
//     window.open(window.location.href, "_blank");
//   };

//   return (
//     <>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             {path[path.length - 1].toUpperCase()}
//           </Typography>
//         </Toolbar>
//       </AppBar>

//     </>
//   );
// }
