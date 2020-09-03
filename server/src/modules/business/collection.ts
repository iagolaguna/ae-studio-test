import { db } from '~/config/database'
import { Business } from './typeDefs/Business'

export const BusinessCollection = db.addCollection<Business>('business')
