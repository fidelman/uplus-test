import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Collapse from '@material-ui/core/Collapse'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { convertDate, getAvatarSrc } from '../../services/utils'

const styles = {
  avatar: {
    width: 275,
    height: 275,
    margin: '20px 0'
  }
}

function LoanDetail({ loan, classes }) {
  const [showFullInfo, setShowFullInfo] = useState(false)

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          From {convertDate(loan.datePublished)} till{' '}
          {convertDate(loan.deadline)}
        </Typography>
        <Avatar
          className={classes.avatar}
          src={getAvatarSrc(loan.photos[0].url)}
          alt={loan.photos[0].name}
        />
        <Typography variant="h3" component="h1">
          {loan.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          by {loan.nickName}
        </Typography>
        <Typography component="p" gutterBottom>
          {loan.story}
        </Typography>
        <Typography component="p" gutterBottom>
          Rating – {loan.rating.replace(/A/g, '⭐️')}
        </Typography>
        <CardActions>
          <Button color="primary" href={loan.url}>
            Visit the page
          </Button>
          <Button
            color="secondary"
            onClick={() => setShowFullInfo(!showFullInfo)}
          >
            {showFullInfo ? 'Less Info' : 'More Info'}
          </Button>
        </CardActions>
        <Collapse in={showFullInfo} timeout="auto" unmountOnExit>
          <CardContent>
            <pre>{JSON.stringify(loan, null, 2)}</pre>
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  )
}

LoanDetail.propTypes = {
  loan: PropTypes.object.isRequired
}

export default withStyles(styles)(LoanDetail)
