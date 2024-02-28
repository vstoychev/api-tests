import {APIRequestContext, expect} from "@playwright/test";

export async function createUser(userToCreate: user, request:APIRequestContext) {
    const response = await request.post('./users', {data:userToCreate});

    expect.soft(response.status()).toBe(201);
    expect(response.statusText()).toBe('Created');
}

export type user = {
    name: string,
    job?: string,
}