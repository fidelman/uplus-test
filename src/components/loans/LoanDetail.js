import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Collapse from '@material-ui/core/Collapse'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { convertDate, getAvatarSrc } from '../../services/utils'
import { getLoansSelector, fetchAllLoans } from '../../ducks/loans'
import Loader from '../common/Loader'
import Error from '../common/Error'

const styles = {
  avatar: {
    width: 275,
    height: 275,
    margin: '20px 0'
  }
}

function LoanDetail({ match, loans, fetchAllLoans, classes }) {
  const [showFullInfo, setShowFullInfo] = useState(false)

  useEffect(() => {
    if (loans.length) return
    fetchAllLoans()
  }, [])

  if (!loans.length) return <Loader />
  const { loanId } = match.params
  const loanDetail = loans.find((loan) => loan.id === Number(loanId))
  if (!loanDetail) return <Error />

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          From {convertDate(loanDetail.datePublished)} till{' '}
          {convertDate(loanDetail.deadline)}
        </Typography>
        <Avatar
          className={classes.avatar}
          src={getAvatarSrc(loanDetail.photos[0].url)}
          alt={loanDetail.photos[0].name}
        />
        <Typography variant="h3" component="h1">
          {loanDetail.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          by {loanDetail.nickName}
        </Typography>
        <Typography component="p" gutterBottom>
          {loanDetail.story}
        </Typography>
        <Typography component="p" gutterBottom>
          Rating – {loanDetail.rating.replace(/A/g, '⭐️')}
        </Typography>
        <CardActions>
          <Button color="primary" href={loanDetail.url}>
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
            <Typography paragraph>
              <pre>{JSON.stringify(loanDetail, null, 2)}</pre>
            </Typography>
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  )
}

LoanDetail.propTypes = {
  fetchAllLoans: PropTypes.func.isRequired,
  loans: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      loanId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default withStyles(styles)(
  withRouter(
    connect(
      (state) => ({
        loans: getLoansSelector(state)
      }),
      { fetchAllLoans }
    )(LoanDetail)
  )
)
