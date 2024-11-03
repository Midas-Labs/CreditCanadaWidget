import { z } from 'zod'

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
//   WORSHIP_SECRET_KEY: z.string(),
})

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `VITE_`.
 */
const client = z.object({
  VITE_API_ENV: z.enum(['local', 'dev', 'staging', 'prod']),
  VITE_API_URL: z.string().optional(),
  VITE_ROOT_DOMAIN: z.string(),
  VITE_GOOGLE_ANALYTICS: z.string().optional(),
  VITE_SHAKEBUGS_API_KEY: z.string().optional(),
  VITE_SHAKEBUGS_URL: z.string().optional(),
  VITE_SEGMENT_WRITE_KEY: z.string().optional(),
  VITE_FEEDBACK_ENV: z.enum(['local', 'dev', 'staging', 'prod']),
  VITE_WORSHIP_SECRET_KEY: z.string(),

})

/**
 * You can't destruct `import.meta.env` as a regular object in Vite so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NODE_ENV: import.meta.env.NODE_ENV,
  VITE_API_ENV: import.meta.env.VITE_API_ENV,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_ROOT_DOMAIN: import.meta.env.VITE_ROOT_DOMAIN,
  VITE_GOOGLE_ANALYTICS: import.meta.env.VITE_GOOGLE_ANALYTICS,
  VITE_WORSHIP_SECRET_KEY: import.meta.env.VITE_WORSHIP_SECRET_KEY,
  VITE_SHAKEBUGS_API_KEY: import.meta.env.VITE_SHAKEBUGS_API_KEY,
  VITE_SHAKEBUGS_URL: import.meta.env.VITE_SHAKEBUGS_URL,
  VITE_SEGMENT_WRITE_KEY: import.meta.env.VITE_SEGMENT_WRITE_KEY,
  VITE_FEEDBACK_ENV: import.meta.env.VITE_FEEDBACK_ENV,
}

// Don't touch the part below
// --------------------------

const merged = server.merge(client)

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env)

if (!!import.meta.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === 'undefined'

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  )

  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors
    )

    throw new Error('Invalid environment variables')
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined

      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith('VITE_'))
        throw new Error(
          import.meta.env.NODE_ENV === 'production'
            ? '❌ Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        )
      return target[/** @type {keyof typeof target} */ (prop as keyof typeof target)]
    }
  })
}

export { env }


