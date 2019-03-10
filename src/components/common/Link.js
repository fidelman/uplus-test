import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class CustomLink extends React.Component {
  static propTypes = {
    unstyled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired
  }

  render() {
    const style = {}

    if (this.props.unstyled) {
      style.textDecoration = 'none'
      style.color = 'initial'
    }

    return (
      <Link to={this.props.to} style={style}>
        {this.props.children}
      </Link>
    )
  }
}

export default CustomLink
