import { test, expect, APIResponse } from '@playwright/test';

test('GetUsers_ValidPageNumber_OK', async ({ request }) => {
  const usersPageNaumber = 1;
  const response = await request.get(`./users?page=${usersPageNaumber}`);

  expect(response.statusText()).toBe("OK");
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  
  expect(responseBody['data']).toContainEqual(expect.objectContaining({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg'
  }));

  expect(responseBody['data'][5]['first_name']).toBe('Tracey');

  expect(responseBody['support']).toBeDefined();

  expect(responseBody).toEqual(expect.objectContaining({
    page: usersPageNaumber,
    data: expect.arrayContaining([
      {
        avatar: "https://reqres.in/img/faces/3-image.jpg",
        email: "emma.wong@reqres.in",
        first_name: "Emma",
        id: 3,
        last_name: "Wong",
      },
      {
      avatar: "https://reqres.in/img/faces/4-image.jpg",
      email: "eve.holt@reqres.in",
      first_name: "Eve",
      id: 4,
      last_name: "Holt",
      },
    ]),
    support: expect.objectContaining({ text: expect.stringContaining('ReqRes') }),
    total: expect.any(Number),
  }));
});

test('PostUsers_NameAndJob_Created', async ({ request }) => {
  const response = await request.post('./users', {
    data: {
      name: 'Ivan',
      job: 'Engineer',
    }
  });

  expect(response.statusText()).toBe("Created");
  expect(response.status()).toBe(201);

  const responseBody = await response.json();
  expect(responseBody).toEqual(expect.objectContaining({
    name: 'Ivan',
    job: 'Engineer',
    id: expect.any(String),
    createdAt: expect.stringContaining('20')
  }));
});

// let apiContext;

// test.beforeAll(async ({ playwright }) => {
//   console.log('Starting tests ...')
//   apiContext = await playwright.request.newContext();
// });

// test.afterAll(async ({ }) => {
//   await apiContext.dispose();
// });

// test.afterEach(async ({ }, testInfo) => {
//   console.log(`Finished test '${testInfo.title}' with status ${testInfo.status}`);

//   if (testInfo.status !== testInfo.expectedStatus) {
//     console.log(`Test '${testInfo.title}' did not finish as expected!`);
//   }
// });