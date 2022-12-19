import { Toolbar } from '@mui/material'
import { Box } from '@mui/material'
import { AppBar } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { PATHS } from '../routes/routes'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CustomButton } from './Button'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Menu } from '@mui/material'
import { MenuItem } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const openDropdown = Boolean(anchorEl);
  const handleUserDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogOut = async () => {
    await logout();
  }

  return (
    <div>
      <AppBar elevation={5} position="relative" sx={{ backgroundColor: 'gray' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                to={PATHS.main}
                sx={{ fontSize: 24 }}
              >
                <Box component={'img'} sx={{ maxWidth: '150px' }} src="/images/logo.png" alt="logo" />
              </Link>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              {!isAuthenticated ?
                  isMobile ?
                    <>
                      <MenuIcon 
                        id="actions-dropdown"
                        sx={{ '&:hover': {cursor: 'pointer', color: grey[800]} }}
                        onClick={handleUserDropdown}
                        arai-control={openDropdown ? 'user-dropdown-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openDropdown ? 'true' : undefined}
                      />
                      <Menu
                        id="actions-dropdown-menu"
                        anchorEl={anchorEl}
                        open={openDropdown}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'user-dropdown',
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={handleClose}>
                          <Link to={PATHS.login} style={{ textDecoration: 'none', color: 'inherit' }}>Prisijungti</Link>
                        </MenuItem>
                        <MenuItem component={'button'} onClick={handleClose}>
                          <Link to={PATHS.registration} style={{ textDecoration: 'none', color: 'inherit' }}>Registruotis</Link>
                        </MenuItem>
                      </Menu>
                    </>
                  :
                    <>
                      <CustomButton
                        variant="outlined"
                        disableElevation
                        sx={{ ml: 3 }}
                      >
                        <Link to={PATHS.login} style={{ textDecoration: 'none', color: 'inherit' }}>
                          Prisijungti
                        </Link>
                      </CustomButton>
                      <CustomButton
                        variant="outlined"
                        disableElevation
                        sx={{ ml: 3 }}
                      >
                        <Link to={PATHS.registration} style={{ textDecoration: 'none', color: 'inherit' }}>
                          Registruotis
                        </Link>
                      </CustomButton>
                    </>
              :
                <>
                {isMobile ?
                  <AccountCircleIcon
                    fontSize="large"
                    id="user-dropdown"
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', '&:hover': {cursor: 'pointer', color: grey[800]} }}
                    onClick={handleUserDropdown}
                    arai-control={openDropdown ? 'user-dropdown-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openDropdown ? 'true' : undefined}
                  />
                :
                  <Box
                    id="user-dropdown"
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', '&:hover': {cursor: 'pointer', color: grey[800]} }}
                    onClick={handleUserDropdown}
                    arai-control={openDropdown ? 'user-dropdown-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openDropdown ? 'true' : undefined}
                  >
                    <AccountCircleIcon fontSize="large" sx={{ mr: 1 }} /> 
                    <Box component={'p'}>{ user.email }</Box>
                    <KeyboardArrowDown />
                  </Box>
                }
                  <Menu
                    id="user-dropdown-menu"
                    anchorEl={anchorEl}
                    open={openDropdown}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'user-dropdown',
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={function () {handleClose(); handleLogOut();}}>Atsijungti</MenuItem>
                    <MenuItem onClick={function () {handleClose(); navigate(PATHS.myVehicles)}}>Mano skelbimai</MenuItem>
                    {user.roles.includes('ROLE_ADMIN') && <MenuItem onClick={function () {handleClose(); navigate(PATHS.admin)}}>Admin</MenuItem>}
                  </Menu>
                </>
              }
            </Box>
          </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header