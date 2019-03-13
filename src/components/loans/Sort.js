import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'

function Sort({ sortBy, sortLoansBy, sorters }) {
  const handleChange = ({ target }) => {
    const { value } = target
    if (sortBy !== value) sortLoansBy(value)
  }

  const Sorters = sorters.map((item) => {
    const [sortBy, sortDir] = item.split('-')

    return (
      <MenuItem key={item} value={item}>
        {sortBy}{' '}
        <span role="img" aria-label={sortDir}>
          {sortDir.toLowerCase() === 'asc' ? '🔺' : '🔻'}
        </span>
      </MenuItem>
    )
  })

  return (
    <FormControl>
      <Select value={sortBy} onChange={handleChange} name="sort-by">
        <MenuItem disabled value="sort-by">
          Sort By
        </MenuItem>
        {Sorters}
      </Select>
    </FormControl>
  )
}

export default Sort
