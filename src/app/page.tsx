import SelectForm from "@/components/selectForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getCarTypes } from "@/lib/service";
import ky from "ky";

export default async function Home() {
  const carTypes = await getCarTypes().json();

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full px-10">
      <Card className="lg:w-2/3 w-full my-8">
        <CardHeader>
          <CardTitle className="flex justify-center">Car Dealer App</CardTitle>
          <CardDescription className="text-center">
            Search for your dream car.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SelectForm carTypes={carTypes} />
        </CardContent>
      </Card>
    </div>
  );
}
