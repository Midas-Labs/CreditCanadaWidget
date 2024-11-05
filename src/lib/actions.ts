

import Client from '../lib/client'
import { getBaseUrl } from '../lib/api'
import { env } from '../env'



const internalClient = new Client(getBaseUrl(), {
    auth: env.VITE_WORSHIP_SECRET_KEY
  })

export async function getAppByDomain(domain: string) {
    try {
      switch (domain.split('.').length) {
        case 1: {
          const data = await internalClient.app.GetAppBySlug(domain)
          return data.app
        }
        default:
          const data = await internalClient.app.GetAppByDomain(domain)
          return data.app
      }
    } catch (err) {
      console.error(err)
      return null
    }
  }
  