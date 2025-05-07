import { BASE_URL } from "../../utils/constans";

export const fetchAdsTypes = async (typeId: string) => {
  try {
    const response = await fetch(`${BASE_URL}types/${typeId}/`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("error", e);
  }
};
