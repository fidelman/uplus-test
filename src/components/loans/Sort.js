import React from 'react'
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import { sortLoansBy, sortLoansBySelector } from '../../ducks/loans'

function Sort({ sortBy, sortLoansBy }) {
  const handleChange = (e) => {
    console.log(e.target.value)
    sortLoansBy(e.target.value)
  }

  return (
    <FormControl>
      <Select value={sortBy} onChange={handleChange} name="sort-by">
        <MenuItem disabled value="sort-by">
          Sort By
        </MenuItem>
        <MenuItem value="duration-ASC">
          Duration{' '}
          <span role="img" aria-label="asc">
            🔺
          </span>
        </MenuItem>
        <MenuItem value="duration-DESC">
          Duration{' '}
          <span role="img" aria-label="desc">
            🔻
          </span>
        </MenuItem>
        <MenuItem value="rating-ASC">
          Rating{' '}
          <span role="img" aria-label="asc">
            🔺
          </span>
        </MenuItem>
        <MenuItem value="rating-DESC">
          Rating{' '}
          <span role="img" aria-label="desc">
            🔻
          </span>
        </MenuItem>
        <MenuItem value="amount-ASC">
          Amount{' '}
          <span role="img" aria-label="asc">
            🔺
          </span>
        </MenuItem>
        <MenuItem value="amount-DESC">
          Amount{' '}
          <span role="img" aria-label="desc">
            🔻
          </span>
        </MenuItem>
        <MenuItem value="deadline-ASC">
          Deadline{' '}
          <span role="img" aria-label="asc">
            🔺
          </span>
        </MenuItem>
        <MenuItem value="deadline-DESC">
          Deadline{' '}
          <span role="img" aria-label="desc">
            🔻
          </span>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default connect(
  (state) => ({
    sortBy: sortLoansBySelector(state)
  }),
  { sortLoansBy }
)(Sort)
