import React from 'react'
import { render } from 'enzyme'
import LoanCard from './LoanCard'

describe('LoandCard', () => {
  const loan = {
    name: 'Lorem Ipsum',
    story:
      'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
    url: 'some url',
    photos: [
      {
        url: '/photo.jpg',
        name: 'some name'
      }
    ]
  }

  it('should render 1 name', () => {
    const component = render(<LoanCard {...loan} />)
    expect(component.find('h2').text()).toBe(loan.name)
  })

  it('should render 1 story with limited characters/words', () => {
    const component = render(<LoanCard {...loan} />)
    expect(component.find('p').text()).toBe(
      'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem'
    )
  })
})
