import React from 'react'
import Typography from '@material-ui/core/Typography'

function Error() {
  return (
    <Typography component="h2" variant="h4">
      Sorry 
      <span role="img" aria-label="sorry">
        🤷‍♀️
      </span>{' '}
      Something went wrong
    </Typography>
  )
}

export default Error
