import { test, request, expect } from "@playwright/test";

test("Create Place in Map", async ({ request }) => {
    const response = await request.post("https://rahulshettyacademy.com/maps/api/place/add/json?Key=qaclick123",
        {
            data: {
                "location": {
                    "lat": -38.383494,
                    "lng": 33.427362
                },
                "accuracy": 50,
                "name": "Frontline house",
                "phone_number": "(+91) 983 893 3937",
                "address": "29, side layout, cohen 09",
                "types": [
                    "shoe park",
                    "shop"
                ],
                "website": "http://google.com",
                "language": "French-IN"
            }
        }
    )
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
    expect(data.scope).toBe("APP")
    const place_id = data.place_id;
    console.log(place_id);
    expect(data.id).toBeDefined();
});

test("Get place data from Map", async ({ request }) => {
    const response = await request.get("http://rahulshettyacademy.com/maps/api/place/get/json?place_id=6cf45e51e76063263d21e4b679781ee6&key=qaclick123");
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    // expect(body.length).toBeGreaterThan();
    

});

test("Put place change the data", async ({ request }) => {
    const response = await request.put("http://rahulshettyacademy.com/maps/api/place/update/json?place_id=ad7af2c4123c9f01000b940e1dee34f0&Key=qaclick123",
        {
            data: {
                // "place_id": "8d2573bdf6ceec0e474c5f388fa917fb",
                "address": "70 winter walk, USA"
            }

        }
    )
    expect(response.status()).toBe(200);
    const body = await response.body();
    console.log(body);
    // expect(body.address).toBe("70 winter walk, USA");
  
    
    
});

test("Dlete place from Map", async({ request })=>{
    const response = await request.post("https://rahulshettyacademy.com/maps/api/place/delete/json?Key=qaclick123",
        {
            data: {
                "place_id": "6cf45e51e76063263d21e4b679781ee6"
            }
        }
    )
    console.log( response.status());
    
})