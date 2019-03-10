import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from './Link'

function Header() {
  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Link unstyled to="/">
          <Typography variant="h5">
            Zonky{' '}
            <span aria-label="zebra" role="img">
              🦓
            </span>
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
