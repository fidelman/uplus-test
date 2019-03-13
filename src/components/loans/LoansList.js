import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { breakpoints } from '../../services/constants'
import Link from '../common/Link'
import FlipMove from 'react-flip-move'
import LoanCard from './LoanCard'

const gapSize = 20
const ListGrid = styled.div`
  /* support IE */
  display: flex;
  flex-wrap: wrap;
  margin: 0 -${gapSize}px -${gapSize}px;

  & > * {
    width: 100%;
    padding: 0 ${gapSize}px ${gapSize}px;

    @media screen and (min-width: ${breakpoints.md}px) {
      width: calc(100% / 2);
    }

    @media screen and (min-width: ${breakpoints.lg}px) {
      width: calc(100% / 3);
    }
  }

  /* support modern browser */
  @supports (grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))) and
    (grid-gap: ${gapSize}px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: ${gapSize}px;

    margin: initial;

    & > * {
      width: initial;
      padding: initial;
    }
  }
`

function LoansList({ loans }) {
  return (
    <ListGrid className="cy-loans-list">
      <FlipMove typeName={null}>
        {loans.map((item) => (
          <Link key={item.id} to={`/zonky/${item.id}`} unstyled>
            <LoanCard key={item.id} {...item} />
          </Link>
        ))}
      </FlipMove>
    </ListGrid>
  )
}

LoansList.propTypes = {
  loans: PropTypes.array.isRequired
}

export default LoansList
