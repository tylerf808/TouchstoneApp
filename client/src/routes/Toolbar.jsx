import * as React from 'react';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Drawer } from '@mui/material';
import { Link } from 'react-router-dom'

export default function Toolbar({ loggedIn, setLoggedIn, setUser, setCosts, costs }) {

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
    <div className='toolbar'>
      {costs ? <IconButton size="large"
        edge="start"
        aria-label="menu"
        onClick={handleClick}
        sx={{marginLeft: 3}}
      >
        <MenuIcon />
      </IconButton> : null}
      <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }} >
        <MenuItem onClick={handleLogOut}><Link style={{ textDecoration: 'none', color: 'black' }} to='/dashboard'>Dashboard</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link style={{ textDecoration: 'none', color: 'black' }} to='/addjob'>Add Job</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link style={{ textDecoration: 'none', color: 'black' }} to='/costs'>Costs</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link style={{ textDecoration: 'none', color: 'black' }} to='/jobs'>Previous Jobs</Link></MenuItem>
        <MenuItem onClick={handleLogOut}><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Log Out</Link></MenuItem>
      </Menu>
      <h1 style={{ fontSize: '1.5em', position: 'relative', left: 10 }}>Touchstone Route Calculator</h1>
    </div >
  );
}