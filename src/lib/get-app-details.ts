import { env } from "../env";
import { getBaseUrl } from "./api";
import Client from "./client";
import { getAppByDomain } from "../lib/actions";
import { nanoid } from "nanoid";

export async function getAppDetails() {
    const domain = env.VITE_ROOT_DOMAIN;
    console.log(domain)

    if (!domain) {
        throw new Error('Domain is not defined');
    }

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