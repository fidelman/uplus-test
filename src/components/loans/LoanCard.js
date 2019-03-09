import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { limitText } from '../../services/utils'

const styles = {
  media: {
    height: 200
  }
}

function LoadCard(props) {
  const { classes, name, photos, story, id } = props
  return (
    <Card>
      <Link to={`/${id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          className={classes.media}
          image={`https://api.zonky.cz${photos[0].url}`}
          title={photos[0].name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography component="p">{limitText(story)}</Typography>
        </CardContent>
      </Link>
    </Card>
  )
}

LoadCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  story: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  url: PropTypes.string.isRequired
}

export default withStyles(styles)(LoadCard)
