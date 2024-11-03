/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */

// Watch out for how the env is imported.
import {env} from '../env.js'
import Client, { Environment, Local } from './client'

export const getBaseUrl = () => {
  if (env.NEXT_PUBLIC_API_URL) {
    return env.NEXT_PUBLIC_API_URL  
  }

  switch (env.NEXT_PUBLIC_API_ENV) {
    case 'prod':
      return Environment('prod')
    case 'dev':
      return Environment('dev')
    case 'staging':
      return Environment('staging')
    case 'local':
      return Local
    default:
      return Local
  }
}

let client: Client | null = null

export const api = {
  newClient: () => {
    return new Client(getBaseUrl(), {})
  },
  get client(): Client {
    if (!client) {
      client = new Client(getBaseUrl(), {})
    }

    return client
  },
  destroyAuth: () => {
    client = new Client(getBaseUrl(), {})
  }
}

export type ApiClient = typeof api
