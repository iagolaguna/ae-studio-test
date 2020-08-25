import { HealthStatus } from '~/modules/health/typeDefs/HealthStatus'

export const getHealthStatus = async () => {
  return await ({ status: 'ok' } as HealthStatus)
}

export default { getHealthStatus }
