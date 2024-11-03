import { env } from "../env.mjs";
import { getBaseUrl } from "./api";
import Client from "./client";
import { getAppByDomain } from "../lib/actions";
import { nanoid } from "nanoid";

  export async function getAppDetails() {
    const domain = env.NEXT_PUBLIC_ROOT_DOMAIN;
    const app = await getAppByDomain(domain);

    if (!app) {
        throw new Error('App not found');
    }

    return {
        appId: app.id,
        publicKey: app.publicApiKey,
        domain: app.slug,
        name: app.name,
        id: nanoid()
    }
  }