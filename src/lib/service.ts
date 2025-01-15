import ky from "ky";

export type BaseResponse<T> = {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: T[];
};

export type CarTypesResult = {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
};

export type CarModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};

export type CarTypes = BaseResponse<CarTypesResult>;

export type CarsByModel = BaseResponse<CarModel>;

export const getCarTypes = () =>
  ky.get<CarTypes>(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );

export const getCarsByModelAndYear = (makeId: string, year: string) =>
  ky.get<CarsByModel>(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
