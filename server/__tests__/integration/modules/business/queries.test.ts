import 'reflect-metadata'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { findAndStoreData } from '~/modules/business/services/update-active-business'
import { findOldestBusiness, findBusinessWithMostLocations } from '~/modules/business/services/queries'
import thirdPartyBusiness from './mocks/third-party-business'

const BUSINESS_DATA_URL = process.env.BUSINESS_DATA_URL
const mockAxios = new MockAdapter(axios)

describe('Business', () => {
  describe('findOldestBusiness', () => {
    it('must return oldest business', async done => {
      mockAxios.onGet(BUSINESS_DATA_URL).reply(200, thirdPartyBusiness)
      await findAndStoreData()
      const oldestBusiness = await findOldestBusiness()
      expect(oldestBusiness.businessName).toEqual('PALACE OF VENICE GUEST HOME /C')
      done()
    })
  })
  describe('findBusinessWithMostLocations', () => {
    it('must return the business with most locations', async done => {
      mockAxios.onGet(BUSINESS_DATA_URL).reply(200, thirdPartyBusiness)
      await findAndStoreData()
      const businessWithMostLocations: any[] = await findBusinessWithMostLocations()
      
      expect(businessWithMostLocations.length).toEqual(4)
      expect(businessWithMostLocations).toEqual(expect.arrayContaining([
        expect.objectContaining({ businessName: 'MOST LOCATION BUSINESS' }),
        expect.objectContaining({ businessName: 'MOST LOCATION BUSINESS' }),
        expect.objectContaining({ businessName: 'MOST LOCATION BUSINESS' }),
        expect.objectContaining({ businessName: 'MOST LOCATION BUSINESS' })
      ]))
      done()
    })
  })
})
