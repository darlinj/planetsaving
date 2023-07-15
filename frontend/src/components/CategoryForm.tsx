import React, {useEffect, useState} from "react";
import {CategoryData, UserDataInput} from "../types";
import DrivingForm from "./category_forms/DrivingForm";
import FlyingForm from "./category_forms/FlyingForm";
import {CircularProgress} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import Cookies from "js-cookie";
import useAddOrUpdateUser from "../api/useAddOrUpdateUser";
import useUserData from "../api/useUserData";

const CategoryForm = ({categoryData}: {categoryData: CategoryData}) => {
  const [isDirty, setIsDirty] = useState(false);
  const [formValues, setFormValues] = useState<UserDataInput>({});

  const userIdString = Cookies.get("user-id");
  const userId = userIdString ? +userIdString : undefined;
  const {data, isLoading, isError} = useUserData(userId);
  const {mutate} = useAddOrUpdateUser();
  const [isLoaded, setIsLoaded] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isDirty) {
      mutate(formValues);

      queryClient.invalidateQueries({queryKey: ["GetClimateData"]});
      queryClient.invalidateQueries({queryKey: ["GetCategoryData"]});
    }
  }, [formValues, isDirty]);

  useEffect(() => {
    if (data) {
      const {id, ...initFormValues} = data;
      if (initFormValues.name !== "AVERAGE JOE") {
        Cookies.set("user-id", `${id}`);
      }
      setFormValues({...initFormValues, name: "SPECIAL JOE"});
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

  const submitChange = () => {
    setIsDirty(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: +value});
  };

  const handleChangeAndSubmit = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
    setIsDirty(true);
  };

  switch (categoryData.category) {
    case "driving":
      return <DrivingForm />;

    case "flying":
      return (
        <FlyingForm
          formValues={formValues}
          submitChange={submitChange}
          handleChange={handleChange}
          handleChangeAndSubmit={handleChangeAndSubmit}
        />
      );
  }
  return <></>;
};

export default CategoryForm;
