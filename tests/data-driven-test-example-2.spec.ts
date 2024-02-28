import {test, expect} from '@playwright/test';
import {createUser, user} from "../utils";

const updateUsersTestsData = [
    {
        title: 'UpdateUsers_Name_OK',
        url: './users/1',
        extraHeaders: {
            'Content-Type': 'application/json',
        },
        body: {
            data: {
                name: 'John',
            }
        },
        expectedStatus: 200,
        expectedStatusText: "OK",
        expectedBodyToEqual: expect.objectContaining({
            name: 'John',
            updatedAt: expect.stringContaining('20')
        })
    },
    {
        title: 'UpdateUsers_NameAndJob_OK',
        url: './users/1',
        extraHeaders: {
            'Content-Type': 'application/json',
        },
        body: {
            data: {
                name: 'Jack',
                job: 'Plumber'
            }
        },
        expectedStatus: 200,
        expectedStatusText: "OK",
        expectedBodyToEqual: expect.objectContaining({
            name: 'Jack',
            job: 'Plumber',
            updatedAt: expect.stringContaining('20')
        })
    },
];

updateUsersTestsData.forEach((testData) => {
    test.use({
        extraHTTPHeaders: testData.extraHeaders
    });
    test(testData.title, async ({request}) => {
        const userToCreate: user = {
            name: 'George',
        }
        await createUser(userToCreate,request);

        const response = await request.put(testData.url, testData.body);

        expect.soft(response.status()).toBe(testData.expectedStatus);
        expect(response.statusText()).toBe(testData.expectedStatusText);


        const responseBody = await response.json();
        expect(responseBody).toEqual(testData.expectedBodyToEqual);
    });
});

