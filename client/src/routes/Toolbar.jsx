import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Toolbar({ loggedIn, user, setLoggedIn, setUser, setCosts, costs }) {

  const handleLogOut = () => {
    setLoggedIn(false)
    setCosts()
    setUser()
    closeNav()
  };

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById('toolbar-header').innerHTML = ''
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById('toolbar-header').innerHTML = 'Touchstone Route Calculator';
  }

  return (
    <div className='toolbar'>
      {loggedIn ? <span id='menu-icon' onClick={openNav}>&#9776;</span> : null}
      <div id="mySidenav" className='sidenav' >
        <span className='closebtn' onClick={closeNav}>&times;</span>
        <div className='sideNavLink' onClick={closeNav}><Link to='/addjob'>Add Job</Link></div>
        <div className='sideNavLink' onClick={closeNav}><Link to='/costs'>Costs</Link></div>
        <div className='sideNavLink' onClick={closeNav}><Link to='/jobs'>Previous Jobs</Link></div>
        <div className='sideNavLink' onClick={handleLogOut}><Link to='/'>Log Out</Link></div>
      </div>
      <h1 className='toolbarHeader' id='toolbar-header' style={{ fontSize: '1.3em', position: 'relative', left: 10 }}>TOUCHSTONE LOGISTICS</h1>
    </div >
  );
}