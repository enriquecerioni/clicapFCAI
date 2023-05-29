import { useReducer } from "react";
import { formDataAxios, reqAxios } from "../../helpers/helpers";
import { alertSuccess } from "../../helpers/alerts";
import SponsorReducer from "./SponsorReducer";
import { SponsorContext } from "./SponsorContex";

export const SponsorState = ({ children }) => {
  const initialState = {
    sponsorInitial: {
      name: "",
      type: "",
      link: "",
      urlFile: "",
      imgbase64: "",
      //only use in frontend
      isNew: true,
    },
    sponsors: [],
    institutional: [],
    isFetching: true,
    totalSponsorPages: 0,
  };

  const [state, dispatch] = useReducer(SponsorReducer, initialState);

  const createNewSponsor = async (sponsor) => {
    try {
      const bodyFormData = new FormData();
      for (const key in sponsor) {
        bodyFormData.append(key, sponsor[key]);
      }
      await formDataAxios("POST", `/sponsor/create`, "", bodyFormData);
    } catch (e) {
      console.log(e);
    }
  };

  const editSponsor = async (id, importantDate) => {
    try {
      await reqAxios("POST", `/importantdate/edit/${id}`, "", importantDate);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllSponsors = async (type) => {
    try {
      const getAllData = await reqAxios("GET", "/sponsor/getall", { type }, "");

      dispatch({
        type:
          type === "All"
            ? "GET_ALL"
            : type === "Sponsor"
            ? "GET_ALL_SPONSORS"
            : "GET_ALL_INSTITUTIONAL",
        payload: getAllData.data.response,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SponsorContext.Provider
      value={{
        sponsorState: state,
        createNewSponsor,
        getAllSponsors,
        editSponsor,
      }}
    >
      {children}
    </SponsorContext.Provider>
  );
};
