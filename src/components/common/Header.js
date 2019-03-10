import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from './Link'

const styles = {
  bar: {
    background: '#fff'
  }
}

function Header({ classes }) {
  return (
    <AppBar position="sticky" className={classes.bar}>
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

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
