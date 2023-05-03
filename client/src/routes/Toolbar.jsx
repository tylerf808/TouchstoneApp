import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Toolbar({ loggedIn, setLoggedIn, setUser, setCosts, costs }) {

  const handleLogOut = () => {
    setLoggedIn(false)
    setCosts()
    setUser()
    closeNav()
  };

  function openNav() {
    document.getElementById("mySidenav").style.width = "220px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
  }

  return (
    <div className='toolbar'>
      {costs ? <span style={{fontSize: 30, cursor: 'pointer', marginLeft: 30}} onClick={openNav}>&#9776;</span> : null}
      <div id="mySidenav" className='sidenav' >
        <span style={{position: 'relative', left: 180, top: -50, fontSize: 40, cursor: 'pointer'}} onClick={() => {
          document.getElementById('mySidenav').style.width = "0px"
        }}>&times;</span>
        <div onClick={closeNav}><Link style={{ textDecoration: 'none', color: 'black' }} to='/addjob'>Add Job</Link></div>
        <div onClick={closeNav}><Link style={{ textDecoration: 'none', color: 'black' }} to='/costs'>Costs</Link></div>
        <div onClick={closeNav}><Link style={{ textDecoration: 'none', color: 'black' }} to='/jobs'>Previous Jobs</Link></div>
        <div onClick={handleLogOut}><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Log Out</Link></div>
      </div>
      <h1 style={{ fontSize: '1.5em', position: 'relative', left: 10 }}>Touchstone Route Calculator</h1>
    </div >
  );
}