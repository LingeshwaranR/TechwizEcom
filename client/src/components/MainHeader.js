import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
import { getUser } from "../actions/userActions";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Input from "@material-ui/icons/Input";
import FlatButton from "material-ui/FlatButton";
import Button from '@material-ui/core/Button';

import '../styles/Header.css';


const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit,
    color:'white' 
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
 
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  toggleOpen = targetComponent => {
    this.setState({ [targetComponent]: !this.state[targetComponent] });
  };

  switchLoginRegister = () => {
    this.setState({
      loginModalOpen: !this.state.loginModalOpen,
      registerModalOpen: !this.state.registerModalOpen
    });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };
  

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  componentDidMount() {
    this.props.getUser();
  }
  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}>
        <MenuItem onClick={this.handleMenuClose} component={Link} to='/account'>
          Account
        </MenuItem>
        <a href="/auth/logout" >
        <MenuItem onClick={this.handleMenuClose}  >
       
        Logout
        </MenuItem></a>
        
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}>
        <MenuItem component={Link} to='/cart'>
          <IconButton color='inherit'>
            <Badge badgeContent={1} color='secondary'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
        <MenuItem>
          <IconButton color='inherit'>
            <Badge badgeContent={2} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen} component={Link} to='/account'>
          <IconButton color='inherit' >
            <AccountCircle />
          </IconButton>
          <p>Account</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <div>
            {this.props.loggedUser ? (
              <Toolbar>
                <Typography
                  className={classes.title}
                  variant='h6'
                  color='inherit'
                  noWrap
                  onClick={() => this.props.history.push("/")}>
                  TECHWIZ
                </Typography>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder='Search…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton color='inherit' component={Link} to='/cart'>
                    <Badge badgeContent={2} color='secondary'>
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                  <IconButton color='inherit'>
                    <Badge badgeContent={1} color='secondary'>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    aria-owns={isMenuOpen ? "material-appbar" : undefined}
                    aria-haspopup='true'
                    onClick={this.handleProfileMenuOpen}
                    color='inherit'>
                    <AccountCircle />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-haspopup='true'
                    onClick={this.handleMobileMenuOpen}
                    color='inherit'>
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            ) : (
              <div>
                <Toolbar>
                  <Typography
                    className={classes.title}
                    variant='h6'
                    color='inherit'
                    noWrap
                    onClick={() => this.props.history.push("/")}>
                    TECHWIZ
                  </Typography>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder='Search…'
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                    />
                  </div>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <Button variant="outlined" className={classes.button}
                   
                      onClick={() => this.toggleOpen("loginModalOpen")}
                    >LOGIN</Button>
                  </div>
                </Toolbar>
              </div>
            )}
          </div>
        </AppBar>

        <LoginModal
          isOpen={this.state.loginModalOpen}
          onRequestClose={() => this.toggleOpen("loginModalOpen")}
          switch={this.switchLoginRegister}
        />
        <RegisterModal
          isOpen={this.state.registerModalOpen}
          onRequestClose={() => this.toggleOpen("registerModalOpen")}
          switch={this.switchLoginRegister}
        />
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  loggedUser: state.loggedUser,
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PrimarySearchAppBar));
