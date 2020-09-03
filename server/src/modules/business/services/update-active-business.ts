import axios from 'axios'
import { logger } from '~/common/logger'
import { ThirdPartyBusiness } from '~/modules/business/types/ThirdPartyBusiness'
import { createBusinessFromThirdPartyBusiness } from '~/modules/business/typeDefs/Business'
import { BusinessCollection } from '~/modules/business/collection'

const BUSSINESS_URL = 'https://data.lacity.org/resource/6rrh-rzua.json'

export const findAndStoreData = async () => {
  logger.info('Updating active business')
  try {
    const response = await axios.get<ThirdPartyBusiness[]>(BUSSINESS_URL)
    const activedBussiness = response.data.map((bussiness) => createBusinessFromThirdPartyBusiness(bussiness))
    BusinessCollection.insert(activedBussiness)
  } catch (err) {
    logger.error(err.message, err.stack)
  }
}
