import axios from 'axios'
import { logger } from '~/common/logger'
import { ThirdPartyBusiness } from '~/modules/business/types/ThirdPartyBusiness'
import { createBusinessFromThirdPartyBusiness } from '~/modules/business/typeDefs/Business'
import { BusinessCollection } from '~/modules/business/collection'

export const findAndStoreData = async () => {
  logger.info('Updating active business')
  const BUSINESS_DATA_URL = process.env.BUSINESS_DATA_URL
  if (!BUSINESS_DATA_URL) {
    throw new Error('business data url is undefined')
  }
  try {
    const response = await axios.get<ThirdPartyBusiness[]>(BUSINESS_DATA_URL)
    const activedBussiness = response.data.map((bussiness) => createBusinessFromThirdPartyBusiness(bussiness))
    BusinessCollection.clear()
    BusinessCollection.insert(activedBussiness)
  } catch (err) {
    logger.error(err.message)
  }
}
