import * as React from 'react';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu'
import { Toolbar, IconButton, Typography, requirePropFactory } from '@mui/material';
import { Container } from '@mui/system';
import { Link, Outlet } from 'react-router-dom'

export default function HamburgerMenu({ loggedIn, setLoggedIn, setUser, setCosts }) {

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setLoggedIn(false)
    setCosts()
    setUser()
    setAnchorEl(null);
  };

  return (
    <Toolbar sx={{ backgroundColor: '#614ECB', display: 'flex', flexDirection: 'row' }}>
      {loggedIn ? <IconButton size="large"
        edge="start"
        aria-label="menu"
        onClick={handleClick}
        sx={{ margin: 1 }}
      >
        <MenuIcon />
      </IconButton> : null}
      <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }} >
        <MenuItem onClick={handleClose}><Link style={{ textDecoration: 'none', color: 'black' }} to='/addjob'>Add Job</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link style={{ textDecoration: 'none', color: 'black' }} to='/costs'>Costs</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link style={{ textDecoration: 'none', color: 'black' }} to='/jobs'>Previous Jobs</Link></MenuItem>
        <MenuItem onClick={handleLogOut}><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Log Out</Link></MenuItem>
      </Menu>
      <Container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flexStart', alignItems: 'center'}}>
        <img style={{height: 80}} src={require('../images/logo.jpg')} />
      </Container>
    </Toolbar >
  );
}