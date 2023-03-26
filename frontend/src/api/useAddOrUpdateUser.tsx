import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {UserDataInput} from "../types";
import backendUrl from "./backend_url";

const addOrUpdateUserQuery = gql`
  query addOrUpdateUser($id: Int!, $user: UserDataInput
    addOrUpdateUser(
        id: $id, user: $user
    ) {
      id
      name
      numberOfPeopleInHome
      kwhOfElectricityUsedPerYear
      kwhOfGasUsedPerYear
      drivingMilesPerYear
      sizeOfCar
      carType
      flyingMilesPerYear
      trainMilesPerYear
      greenEnergyTarriff
      amountOfLocalFood
      amountOfOrganicFood
      percentageOfFoodWaste
    }
  }
`;

function useUserData(user: UserDataInput, id?: number | undefined) {
  return useQuery<UserDataInput>(["AddOrUpdateUser", id], async () => {
    const data = await request(backendUrl, addOrUpdateUserQuery, {
      id,
      user,
    });
    return data.addOrUpdateUser;
  });
}

export default useUserData;
