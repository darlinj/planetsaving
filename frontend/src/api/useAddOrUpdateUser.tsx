import {useMutation} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {UserDataInput} from "../types";
import backendUrl from "./backend_url";

const addOrUpdateUserQuery = gql`
  mutation addOrUpdateUser($id: Int!, $user: UserDataInput) {
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

// const submitForm = (user: UserDataInput) => {
//   return request(backendUrl, addOrUpdateUserQuery, {
//     user,
//   });
// };

// function useAddOrUpdateUser() {
//   return useMutation(submitForm);
// }

const submitMutation = (input: UserDataInput) => {
  return request<any, UserDataInput>(backendUrl, addOrUpdateUserQuery, input);
};

export const useAddOrUpdateUser = () => {
  return useMutation<any, Error, UserDataInput>(submitMutation);
};

export default useAddOrUpdateUser;
