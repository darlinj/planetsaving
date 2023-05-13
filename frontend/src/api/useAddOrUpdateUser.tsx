import {useMutation} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {UserDataInput} from "../types";
import backendUrl from "./backend_url";
import Cookies from "js-cookie";

const addOrUpdateUserQuery = gql`
  mutation addOrUpdateUser($id: Int!, $user: UserInput) {
    addOrUpdateUser(id: $id, user: $user) {
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

const submitMutation = async (input: UserDataInput) => {
  const userIdString = Cookies.get("user-id");
  const userId = userIdString ? +userIdString : 0;
  const userData = {id: userId, user: input};
  const response = await request<any, {id: number | null; user: UserDataInput}>(
    backendUrl,
    addOrUpdateUserQuery,
    userData
  );
  Cookies.set("user-id", response.addOrUpdateUser.id);
  return response;
};

export const useAddOrUpdateUser = () => {
  return useMutation<any, Error, UserDataInput>(submitMutation);
};

export default useAddOrUpdateUser;
