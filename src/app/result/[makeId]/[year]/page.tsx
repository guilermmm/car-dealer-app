import CarList from "@/components/carList";
import SkeletonCard from "@/components/skeletonCard";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCarTypes } from "@/lib/service";
import { getYears } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export async function generateStaticParams() {
  const carTypes = await getCarTypes().json();

  const paths = getYears()
    .map(year => {
      return carTypes.Results.map(car => ({
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

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full px-10">
      <Card className="lg:w-2/3 w-full my-8">
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
            <div className="flex-[1] text-center text-xl">Car Dealer App</div>
            <div className="flex-[1]"></div>
          </CardTitle>
          <CardDescription className="text-center">
            Car results.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Suspense fallback={<SkeletonCard />}>
            <CarList makeId={makeId} year={year} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
