import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
const BaseUrl = process.env.BASE_URL;

test("Check Status Code ,Requirement Fields in Get Request ,and Validate json schema", async ({ request }) => {

    const ajv = new Ajv();

    const response = await request.get(`${BaseUrl}/users?page=2`);
    const responseBody = await response.json();

    const valid = ajv.validate(require('./jsonSchema.json'), responseBody);

    if (!valid) {
        console.error('AJV Validation Errors:', ajv.errorsText());
    }
    expect(valid).toBe(true);

    expect(response.status()).toBe(200);

    for (let i = 0; i < responseBody.per_page; i++) {
        expect(responseBody.data[i]).toHaveProperty("id");
        expect(responseBody.data[i]).toHaveProperty("email");
        expect(responseBody.data[i]).toHaveProperty("first_name");
        expect(responseBody.data[i]).toHaveProperty("last_name");
        expect(responseBody.data[i]).toHaveProperty("avatar");
    }
});


test("Check user info", async ({ request }) => {

    const response = await request.get(`${BaseUrl}/users/2`);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.email).toBe("janet.weaver@reqres.in");
    expect(responseBody.data.first_name).toBe("Janet");
    expect(responseBody.data.last_name).toBe("Weaver");
    expect(responseBody.data.avatar).toBe("https://reqres.in/img/faces/2-image.jpg");

});
test("Check status code for unknow user", async ({ request }) => {
    const response = await request.get(`${BaseUrl}/users/23`);
    expect(response.status()).toBe(404);
});

test("Check the info of all users", async ({ request }) => {
    const response = await request.get(`${BaseUrl}/unknown`);
    const responseBody = await response.json();
    const usersInfo = [
        {
            id: 1,
            name: "cerulean",
            year: 2000,
            color: "#98B2D1",
            pantone: "15-4020"
        },
        {
            id: 2,
            name: "fuchsia rose",
            year: 2001,
            color: "#C74375",
            pantone: "17-2031"
        },
        {
            id: 3,
            name: "true red",
            year: 2002,
            color: "#BF1932",
            pantone: "19-1664"
        },
        {
            id: 4,
            name: "aqua sky",
            year: 2003,
            color: "#7BC4C4",
            pantone: "14-4811"
        },
        {
            id: 5,
            name: "tigerlily",
            year: 2004,
            color: "#E2583E",
            pantone: "17-1456"
        },
        {
            id: 6,
            name: "blue turquoise",
            year: 2005,
            color: "#53B0AE",
            pantone: "15-5217"
        },

    ];
    expect(response.status()).toBe(200);
    expect(responseBody.page).toBe(1);
    expect(responseBody.per_page).toBe(6);
    expect(responseBody.total).toBe(12);
    expect(responseBody.total_pages).toBe(2);
    for (let i = 0; i < responseBody.per_page; i++) {
        expect(responseBody.data[i].id).toBe(usersInfo[i].id);
        expect(responseBody.data[i].name).toBe(usersInfo[i].name);
        expect(responseBody.data[i].year).toBe(usersInfo[i].year);
        expect(responseBody.data[i].color).toBe(usersInfo[i].color);
        expect(responseBody.data[i].pantone_value).toBe(usersInfo[i].pantone);
    }
});
test("Get Single Resource Not Found", async ({ request }) => {
    const response = await request.get(`${BaseUrl}/unknown/23`);
    expect(response.status()).toBe(404);
});

test("User Data", async ({ request }) => {
    const response = await request.post(`${BaseUrl}/users`, {
        data: {
            "name": "morpheus",
            "job": "leader"
        }
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(201);
    expect(responseBody.name).toBe("morpheus");
    expect(responseBody.job).toBe("leader");
    expect(typeof responseBody.id).toBeTruthy();
});

test("Verify Update values", async ({ request }) => {
    const response = await request.put(`${BaseUrl}/users/2`, {
        data: {
            "name": "morpheus",
            "job": "zion resident"
        }
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe("morpheus");
    expect(responseBody.job).toBe("zion resident");
});


test("Update The User Using PATCH", async ({ request }) => {
    const response = await request.patch(`${BaseUrl}/users/2`, {
        data: {
            "name": "morpheus",
            "job": "zion resident"
        }
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe("morpheus");
    expect(responseBody.job).toBe("zion resident");
})


test("Status Code", async ({ request }) => {
    const response = await request.delete(`${BaseUrl}/users/2`, {
        data: {
            "name": "morpheus",
            "job": "zion resident"
        }
    });
    expect(response.status()).toBe(204);
})


test("Check status code for Successful Register", async ({ request }) => {
    const response = await request.post(`${BaseUrl}/register`, {
        data: {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.id).toBe(4);
    expect(responseBody.token).toBeTruthy();
})

test("Check status code for Unsuccessful Register", async ({ request }) => {
    const response = await request.post(`${BaseUrl}/register`, {
        data: {
            "email": "sydney@fife"
        }
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe("Missing password");
});

test("Check status code for Successful Login", async ({ request }) => {
    const response = await request.post(`${BaseUrl}/register`, {
        data: {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.token).toBeTruthy();
});


test("Check status code for Unsuccessful Login", async ({ request }) => {
    const response = await request.post(`${BaseUrl}/register`, {
        data: {
            "email": "peter@klaven"
        }
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe("Missing password");
})

test('Response is delayed by 3 seconds', async ({ request }) => {
    const start = Date.now();
    await request.get(`${BaseUrl}/users?delay=3`);
    const end = Date.now();
    const duration = (end - start) / 1000;
    expect(duration).toBeGreaterThanOrEqual(3);
});

