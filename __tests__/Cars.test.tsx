import { render, screen, waitFor } from "@testing-library/react";
import CarCatalog from "@/components/CarCatalog";

const mockResult = {
    "success": true,
    "count": 4,
    data: [ {
        "_id": "65fce2489bec4603fb757ac2",
        "brand": "Mercedes-Benz",
        "carModel": "a-class",
        "type": "sedan",
        "pricePerDay": 2500,
        "licensePlate": "ZIGQ9",
        "address": "615 Shanon Fords",
        "district": "Cambridgeshire",
        "province": "South Dakota",
        "postalCode": "72542",
        "googleMapsURL": "https://www.google.com/maps?q=0.8004,-74.8376",
        "imageURL": "https://lh3.googleusercontent.com/drive-viewer/AKGpihYt2oHuGyforV72VH0hAWg52ySt6J0xhD3g9LkvyvdelFVEpGGIT6tGp9whKpALncPBBwgg8SJv4y3KyfqpMixrtglIIg=s2560",
        "tel": "0913495210",
        "bookings": [],
        "id": "65fce2489bec4603fb757ac2"
    },
    {
        "_id": "65fce2489bec4603fb757ac3",
        "brand": "Mercedes-Benz",
        "carModel": "c-class",
        "type": "sedan",
        "pricePerDay": 3000,
        "licensePlate": "N3X5J",
        "address": "254 Fay Harbor",
        "district": "Avon",
        "province": "Minnesota",
        "postalCode": "48020",
        "googleMapsURL": "https://www.google.com/maps?q=-59.2620,-75.3478",
        "imageURL": "https://lh3.googleusercontent.com/drive-viewer/AKGpihYXVAYUJYSqghcFbKRCTzV3NlhF8NXmSa6LBK7-SAQWf5hXmRg7KvGZwNU7XrD2rRcaBlasMLTXwpEUzIth1XPGc2vTPA=s1600",
        "tel": "0442262601",
        "bookings": [],
        "id": "65fce2489bec4603fb757ac3"
    },
    {
        "_id": "65fce2489bec4603fb757ac4",
        "brand": "Mercedes-Benz",
        "carModel": "e-class",
        "type": "sedan",
        "pricePerDay": 3500,
        "licensePlate": "AZCOW",
        "address": "72359 Camilla Turnpike",
        "district": "Berkshire",
        "province": "Indiana",
        "postalCode": "60092",
        "googleMapsURL": "https://www.google.com/maps?q=9.4597,-120.5473",
        "imageURL": "https://lh3.googleusercontent.com/drive-viewer/AKGpihbcUKNqjTEteyTx9Ov0FtEU75piHQD0EI7J6XVcdUShPUevSBbDRBVws04PyMCQycdhfkCuak7_xAz-On4d1Lqg1Px15A=s2560",
        "tel": "0812042383",
        "bookings": [],
        "id": "65fce2489bec4603fb757ac4"
    },
    {
        "_id": "65fce2489bec4603fb757ac5",
        "brand": "Mercedes-Benz",
        "carModel": "s-class",
        "type": "sedan",
        "pricePerDay": 4000,
        "licensePlate": "I8BW2",
        "address": "97037 Hilton Islands",
        "district": "Avon",
        "province": "Texas",
        "postalCode": "65229",
        "googleMapsURL": "https://www.google.com/maps?q=2.4124,-77.1195",
        "imageURL": "https://lh3.googleusercontent.com/drive-viewer/AKGpihaRsdzyr6xO2_Os_LWHdnVdHSVDTEjZsCq6qKwWVGdK9ACKk0fpOG2pubTSaE58YSjClEUpg0sJ8TVTOAYy7UKP6g0Fiw=s1600",
        "tel": "0244550061",
        "bookings": [],
        "id": "65fce2489bec4603fb757ac5"
    },
]
}
//mock have only 4 datas.
describe('CarCatalog', () => {
    it('should have correct number of car images', async () => {
        const carCatalog = await CarCatalog({carJson:mockResult});
        render(carCatalog);
        await waitFor(
            ()=> {
                const carImages = screen.queryAllByRole('img');
                expect(carImages.length).toBe(4);
            }
        )
    })
})
