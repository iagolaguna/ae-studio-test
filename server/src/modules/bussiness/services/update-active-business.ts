import axios from 'axios'
import { logger } from '~/common/logger'
import { ThirdPartyBussiness } from '~/modules/bussiness/types/ThirdPartyBusiness'
import { createBusinessFromThirdPartyBusiness } from '~/modules/bussiness/typeDefs/Business'
import { BusinessCollection } from '~/modules/bussiness/collection'

const BUSSINESS_URL = 'https://data.lacity.org/resource/6rrh-rzua.json'

export const findAndStoreData = async () => {
  logger.info('Updating active business')
  try {
    const response = await axios.get<ThirdPartyBussiness[]>(BUSSINESS_URL)
    const activedBussiness = response.data.map((bussiness) => createBusinessFromThirdPartyBusiness(bussiness))
    BusinessCollection.insert(activedBussiness)
  } catch (err) {
    logger.error(err.message, err.stack)
  }
}