import Image from "next/image";
import getCar from "@/libs/getCar";
import Link from "next/link";

export default async function CarDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const carDetail = await getCar(params.cid);

  /**
   * Mock Data for Demonstration Only
   */

  /*
    const mockCarRepo = new Map()
    mockCarRepo.set("001", {name: "Honda Civic", image:"/img/civic.jpg"})
    mockCarRepo.set("002", {name: "Honda Accord", image:"/img/accord.jpg"})
    mockCarRepo.set("003", {name: "Honda Accord", image:"/img/accord.jpg"})
    mockCarRepo.set("004", {name: "Tesla Model 3", image:"/img/tesla.jpg"})
    */

  return (
    <main className="text-center p-5">
      <div className="flex flex-col my-5 xl:flex-row items-center text-center">
        <Image
          src={carDetail.data.imageURL}
          alt="Car Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-1/2  mr-5"
        />
        <div className="rounded-lg w-1/2 ml-5 flex flex-col">
          <div className="text-5xl text-left my-5 text-red-400 font-bold flex">
            {carDetail.data.brand}
            </div>
            <div className="text-xl text-left text-red-300 font-bold  flex">
              Car model: {carDetail.data.carModel}
            </div>
            <div className="text-xl text-left text-red-300 font-bold  flex">Type: {carDetail.data.type}</div>
            <div className="text-xl text-left text-red-300 font-bold  flex">
              Price per day: {carDetail.data.pricePerDay}
            </div>
            <div className="text-xl text-left text-red-300 font-bold  flex">
              License plate: {carDetail.data.licensePlate}
            </div>
            <div className="text-xl text-left text-red-300 font-bold  flex">
              Address: {carDetail.data.address}
            </div>
            <div className="text-xl text-left text-red-300 font-bold  flex">
              District: {carDetail.data.district}
            </div>
            <div className="text-xl text-left text-red-300 font-bold  flex">
              Province: {carDetail.data.province}
            </div>
            <div className="text-xl text-left text-red-300 font-bold  flex">
              Postal code: {carDetail.data.postalCode}
            </div>
            <div className="text-xl text-left text-red-300 font-bold  flex">
              Google map URL: {carDetail.data.googleMapsURL}
            </div>
            <div className="text-xl text-left text-red-300 font-bold mb-5  flex">Tel.: {carDetail.data.tel}</div>
          

          <Link
            href={`/reservations?id=${params.cid}&model=${carDetail.data.carModel}`}
            className="w-full flex h-full"
          >
            <button
              className="block rounded-md bg-red-400 hover:bg-red-600 transition-all duration-300  px-3 py-2
                text-white shadow-sm w-full font-bold"
            >
              Make Reservation
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ cid: "001" }, { cid: "002" }, { cid: "003" }, { cid: "004" }];
}
