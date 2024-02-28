import { test, expect } from '@playwright/test';

const postUsersTestsData = [
    { title: 'PostUsers_Name_Created',
        url:'./users',
        extraHeaders:{
            'Content-Type': 'application/json',
        },
        body:{
            data: {
                name: 'Pesho',
            }
        },
        expectedStatus: 201,
        expectedStatusText: "Created",
        expectedBodyToEqual:expect.objectContaining({
            name: 'Pesho',
            id: expect.any(String),
            createdAt: expect.stringContaining('20')
        })
    },
    { title: 'PostUsers_NameAndJob_Created',
        url:'./users',
        extraHeaders:{
            'Additional-Header': 'Extra',
            'Content-Type': 'application/json',
        },
        body:{
            data: {
                name: 'Ivan',
                job: 'Engineer',
            }
        },
        expectedStatus: 201,
        expectedStatusText: "Created",
        expectedBodyToEqual:expect.objectContaining({
            name: 'Ivan',
            job: 'Engineer',
            id: expect.any(String),
            createdAt: expect.stringContaining('20')
        })
    },
    { title: 'PostUsers_EmptyBody_Created',
        url:'./users',
        extraHeaders:{},
        body:{},
        expectedStatus: 201,
        expectedStatusText: "Created",
        expectedBodyToEqual:expect.objectContaining({
            id: expect.any(String),
            createdAt: expect.stringContaining('20')
        })
    },
];

postUsersTestsData.forEach((testData) => {
    test.use({
        extraHTTPHeaders: testData.extraHeaders
    });
    test(testData.title, async ({ request }) => {
        const response = await request.post(testData.url, testData.body);

        expect.soft(response.status()).toBe(testData.expectedStatus);
        expect(response.statusText()).toBe(testData.expectedStatusText);


        const responseBody = await response.json();
        expect(responseBody).toEqual(testData.expectedBodyToEqual);
    });
});

