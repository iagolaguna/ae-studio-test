
import 'reflect-metadata'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { findAndStoreData } from '~/modules/business/services/update-active-business'
import { BusinessCollection } from '~/modules/business/collection'
import thirdPartyBusiness from './mocks/third-party-business'

const BUSINESS_DATA_URL = process.env.BUSINESS_DATA_URL
const mockAxios = new MockAdapter(axios)

describe('Business', () => {
  describe('findAndStoreData', () => {
    it('must search and parse correctly the data', async done => {
      mockAxios.onGet(BUSINESS_DATA_URL).reply(200, thirdPartyBusiness)
      await findAndStoreData()
      const business = await BusinessCollection.find()

      expect(business).toEqual(expect.arrayContaining([
        expect.objectContaining({
          locationAccount: '0000000108-0001-3',
          businessName: 'PALACE OF VENICE GUEST HOME /C',
          streetAdress: '1727 CRENSHAW BLVD',
          city: 'LOS ANGELES',
          zipCode: '90019-6037',
          locationDescription: '1727 CRENSHAW 90019-6037',
          naics: '721310',
          primaryNaicsDescription: 'Rooming & boarding houses',
          councilDistrict: '10',
          locationStartDate: new Date('1900-05-15T03:06:28.000Z'),
          location: {
            latitude: 34.0425,
            longitude: -118.3295
          }
        }),
        expect.objectContaining({
          locationAccount: '0000000115-0001-3',
          businessName: 'VINCENZO LABELLA',
          streetAdress: '521 SWARTHMORE AVENUE',
          city: 'PACIFIC PALISADES',
          zipCode: '90272-4350',
          locationDescription: '521 SWARTHMORE 90272-4350',
          mailingAddress: '521 SWARTHMORE AVENUE',
          mailingCity: 'PACIFIC PALISADES',
          mailingZipCode: '90272-4350',
          naics: '561500',
          primaryNaicsDescription: 'Travel arrangement & reservation services',
          councilDistrict: '11',
          locationStartDate: new Date('1990-01-01T02:00:00.000Z')
        }),
        expect.objectContaining({
          locationAccount: '0000000121-0001-9',
          businessName: 'WILCARE ECONOMIC DEVELOPMENT CORPORATION',
          streetAdress: '9911 AVALON BLVD',
          city: 'LOS ANGELES',
          zipCode: '90003-4805',
          locationDescription: '9911 AVALON 90003-4805',
          mailingAddress: '448 E 99TH STREET',
          mailingCity: 'LOS ANGELES',
          mailingZipCode: '90003-4804',
          naics: '721310',
          primaryNaicsDescription: 'Rooming & boarding houses',
          councilDistrict: '8',
          locationStartDate: new Date('1999-01-01T02:00:00.000Z'),
          location: {
            latitude: 33.9463,
            longitude: -118.2651
          }
        }),
        expect.objectContaining({
          locationAccount: '0000000132-0001-7',
          businessName: 'CARLOS ANGEL',
          streetAdress: '1221 W 7TH STREET SUITE #N-111',
          city: 'LOS ANGELES',
          zipCode: '90017-2394',
          locationDescription: '1221 7TH 90017-2394',
          naics: '561300',
          primaryNaicsDescription: 'Employment services',
          councilDistrict: '1',
          locationStartDate: new Date('1999-07-01T03:00:00.000Z'),
          location: {
            latitude: 34.0521,
            longitude: -118.2662
          }
        }),
        expect.objectContaining({
          locationAccount: '0000000133-0001-1',
          businessName: 'A A OFICINA CENTRAL HISPANA DE LOS ANGELES /C',
          streetAdress: '4917 S BROADWAY',
          city: 'LOS ANGELES',
          zipCode: '90037-3211',
          locationDescription: '4917 BROADWAY 90037-3211',
          mailingAddress: '2607 VAN BUREN PLACE',
          mailingCity: 'LOS ANGELES',
          mailingZipCode: '90007-2129',
          naics: '611000',
          primaryNaicsDescription: 'Educational services (including schools, colleges, & universities)',
          councilDistrict: '9',
          locationStartDate: new Date('1991-01-01T02:00:00.000Z'),
          location: {
            latitude: 33.9981,
            longitude: -118.2783
          }
        }),
        expect.objectContaining({
          locationAccount: '0000000141-0001-6',
          businessName: 'A A OFICINA CENTRAL HISPANA DE LOS ANGELES /C',
          streetAdress: '1330 WILSHIRE BLVD #208',
          city: 'LOS ANGELES',
          zipCode: '90017-1705',
          locationDescription: '1330 WILSHIRE 90017-1705',
          mailingAddress: '2607 VAN BUREN PLACE',
          mailingCity: 'LOS ANGELES',
          mailingZipCode: '90007-2129',
          naics: '611000',
          primaryNaicsDescription: 'Educational services (including schools, colleges, & universities)',
          councilDistrict: '1',
          locationStartDate: new Date('1991-01-01T02:00:00.000Z'),
          location: {
            latitude: 34.0543,
            longitude: -118.2678
          }
        }),
        expect.objectContaining({
          locationAccount: '0000000143-0001-5',
          businessName: 'DIAMOND PERFORATED METALS INC',
          streetAdress: '11093 BEECH AVENUE',
          city: 'FONTANA',
          zipCode: '92337-7268',
          locationDescription: '11093 BEECH 92337-7268',
          mailingAddress: '7300 W SUNNYVIEW AVENUE',
          mailingCity: 'VISALIA',
          mailingZipCode: '93291-9605',
          naics: '423500',
          primaryNaicsDescription: 'Metal & mineral (except petroleum)',
          councilDistrict: '0',
          locationStartDate: new Date('1974-07-01T03:00:00.000Z'),
          location: {
            latitude: 34.0526,
            longitude: -117.4713
          }
        })
      ]))

      done()
    })
  })
})
