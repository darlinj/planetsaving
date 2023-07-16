import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {UserData} from "../types";
import backendUrl from "./backend_url";

const getUserDataQuery = gql`
  query GetUserData($id: Int) {
    getUser(id: $id) {
      id
      name
      numberOfPeopleInHome
      kwhOfElectricityUsedPerYear
      kwhOfGasUsedPerYear
      drivingMilesPerYear
      sizeOfCar
      flyingHoursPerYear
      trainMilesPerYear
      carType
      greenEnergyTarriff
      amountOfLocalFood
      amountOfOrganicFood
      percentageOfFoodWaste
    }
  }
`;

function useUserData(id?: number | undefined) {
  return useQuery<UserData>(["GetUserData", id], async () => {
    const data = await request(backendUrl, getUserDataQuery, {
      id: id,
    });
    return data.getUser;
  });
}

export default useUserData;
