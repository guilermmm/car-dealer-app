import { CarModel, getCarsByModelAndYear } from "@/lib/service";
import { googleSearchLink } from "@/lib/utils";
import Link from "next/link";

export default async function CarList({
  makeId,
  year,
}: {
  makeId: string;
  year: string;
}) {
  const cars = await getCarsByModelAndYear(makeId, year)
    .then((res) => res.json())
    .catch(() => {
      return null;
    });

  return cars ? (
    cars.Results.map((car, i) => <CarCard key={i} car={car} />)
  ) : (
    <div className="text-red-500">
      There was a problem fetching the cars, try again later.
    </div>
  );
}

const CarCard = ({ car }: { car: CarModel }) => {
  return (
    <div className="border p-4 border-gray-200 rounded-md shadow-md">
      <div>
        <b>{"Car id: "}</b>
        {car.Model_ID}
      </div>
      <div>
        <b>{"Model: "}</b>
        {car.Model_Name}
      </div>
      <Link
        href={googleSearchLink(`${car.Make_Name} ${car.Model_Name}`)}
        target="_blank"
        className="text-bold text-blue-500"
      >
        Search
      </Link>
    </div>
  );
};
