import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCarsByModelAndYear, getCarTypes, CarModel } from "@/lib/service";
import { getYears, googleSearchLink } from "@/lib/utils";
import Link from "next/link";

export async function generateStaticParams() {
  const carTypes = await getCarTypes().json();

  const paths = getYears()
    .map((year) => {
      return carTypes.Results.map((car) => ({
        makeId: car.MakeId.toString(),
        year: year.toString(),
      }));
    })
    .flat();

  return paths;
}

export default async function Page({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>;
}) {
  const { makeId, year } = await params;

  const cars = await getCarsByModelAndYear(makeId, year)
    .then((res) => res.json())
    .catch(() => {
      return null;
    });

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="flex-[1]">
              <Link
                className={` ${buttonVariants({ variant: "default" })}`}
                href="/"
              >
                Back
              </Link>
            </div>
            <div className="flex-[1] text-center">Car Dealer App</div>
            <div className="flex-[1]"></div>
          </CardTitle>
          <CardDescription className="text-center">
            Car results for {cars?.Results[0].Make_Name}.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {cars ? (
            cars.Results.map((car, i) => <CarCard key={i} car={car} />)
          ) : (
            <div>There was a problem fetching the cars, try again later.</div>
          )}
        </CardContent>
      </Card>
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
