import React, {useEffect} from "react";
import {CategoryData, UserDataInput} from "../types";
import DrivingForm from "./category_forms/DrivingForm";
import FlyingForm from "./category_forms/FlyingForm";
import {CircularProgress} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import Cookies from "js-cookie";
import useAddOrUpdateUser from "../api/useAddOrUpdateUser";
import useUserData from "../api/useUserData";
import GasForm from "./category_forms/GasForm";

const CategoryForm = ({categoryData}: {categoryData: CategoryData}) => {
  const userIdString = Cookies.get("user-id");
  const userId = userIdString ? +userIdString : undefined;
  const {data, isLoading, isError} = useUserData(userId);
  const {mutate} = useAddOrUpdateUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      const {id, name} = data;
      if (name !== "AVERAGE JOE") {
        Cookies.set("user-id", `${id}`);
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
        Loading...
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load data</div>;
  }

  if (!data) {
    return <div>No user data found</div>;
  }

  const submitChange = (newFormValues: UserDataInput) => {
    mutate(newFormValues);
    queryClient.invalidateQueries({queryKey: ["GetClimateData"]});
    queryClient.invalidateQueries({queryKey: ["GetCategoryData"]});
  };

  const {id, ...initialFormValues} = data;

  switch (categoryData.category) {
    case "driving":
      return (
        <DrivingForm
          initialFormValues={initialFormValues}
          saveChange={submitChange}
        />
      );
    case "flying":
      return (
        <FlyingForm
          initialFormValues={initialFormValues}
          saveChange={submitChange}
        />
      );
    case "gas":
      return (
        <GasForm
          initialFormValues={initialFormValues}
          saveChange={submitChange}
        />
      );
  }
  return <></>;
};

export default CategoryForm;
