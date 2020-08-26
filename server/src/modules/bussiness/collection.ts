import { db } from '~/config/database'
import { Bussiness } from './typeDefs/Bussiness'

export const BussinessCollection = db.addCollection<Bussiness>('bussiness')
