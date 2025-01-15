"use client";

import { getYears } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { CarTypes } from "@/lib/service";

export default function SelectForm({ carTypes }: { carTypes: CarTypes }) {
  const router = useRouter();
  const [selectedMakeId, setSelectedMakeId] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="make">Make</Label>
        <Select value={selectedMakeId} onValueChange={setSelectedMakeId}>
          <SelectTrigger id="make">
            <SelectValue placeholder="Select make" />
          </SelectTrigger>
          <SelectContent position="popper">
            {carTypes.Results.map(car => (
              <SelectItem key={car.MakeId} value={car.MakeId.toString()}>
                {car.MakeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger id="year">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent position="popper">
            {getYears().map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center pt-4">
        <Button
          className="w-1/2"
          onClick={() =>
            router.push(`/result/${selectedMakeId}/${selectedYear}`)
          }
          disabled={!selectedMakeId || !selectedYear}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
