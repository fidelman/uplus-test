import { Record, List } from 'immutable'
import reducer, { sortLoansBy } from './loans'
import db from '../db'

const getIds = (list) =>
  list
    .get('entities')
    .map((item) => item.id)
    .toJS()

describe('Loans Sorting', () => {
  describe('should sort rating', () => {
    it('ASC', () => {
      const action = sortLoansBy('rating-ASC')
      const ReducerRecord = Record({
        entities: List(db)
      })
      const actual = reducer(new ReducerRecord(), action)
      const expected = [419516, 419710, 419045, 416093, 419967, 419682]
      expect(getIds(actual)).toEqual(expected)
    })

    it('DESC', () => {
      const action = sortLoansBy('rating-DESC')
      const ReducerRecord = Record({
        entities: List(db)
      })
      const actual = reducer(new ReducerRecord(), action)
      const expected = [419682, 419967, 419045, 416093, 419516, 419710]
      expect(getIds(actual)).toEqual(expected)
    })
  })

  describe('should sort duration', () => {
    it('ASC', () => {
      const action = sortLoansBy('duration-ASC')
      const ReducerRecord = Record({
        entities: List(db)
      })
      const actual = reducer(new ReducerRecord(), action)
      const expected = [419516, 419710, 419045, 416093, 419967, 419682]
      expect(getIds(actual)).toEqual(expected)
    })

    it('DESC', () => {
      const action = sortLoansBy('duration-DESC')
      const ReducerRecord = Record({
        entities: List(db)
      })
      const actual = reducer(new ReducerRecord(), action)
      const expected = [419682, 419967, 416093, 419045, 419710, 419516]
      expect(getIds(actual)).toEqual(expected)
    })
  })

  describe('should sort amount', () => {
    it('ASC', () => {
      const action = sortLoansBy('amount-ASC')
      const ReducerRecord = Record({
        entities: List(db)
      })
      const actual = reducer(new ReducerRecord(), action)
      const expected = [419682, 419967, 416093, 419045, 419710, 419516]
      expect(getIds(actual)).toEqual(expected)
    })

    it('DESC', () => {
      const action = sortLoansBy('amount-DESC')
      const ReducerRecord = Record({
        entities: List(db)
      })
      const actual = reducer(new ReducerRecord(), action)
      const expected = [419516, 419710, 419045, 416093, 419967, 419682]
      expect(getIds(actual)).toEqual(expected)
    })
  })

  describe('should sort deadline', () => {
    it('ASC', () => {
      const action = sortLoansBy('deadline-ASC')
      const ReducerRecord = Record({
        entities: List(db)
      })
      const actual = reducer(new ReducerRecord(), action)
      const expected = [419516, 419710, 419045, 416093, 419967, 419682]
      expect(getIds(actual)).toEqual(expected)
    })

    it('DESC', () => {
      const action = sortLoansBy('deadline-DESC')
      const ReducerRecord = Record({
        entities: List(db)
      })
      const actual = reducer(new ReducerRecord(), action)
      const expected = [419682, 419967, 416093, 419045, 419710, 419516]
      expect(getIds(actual)).toEqual(expected)
    })
  })
})
