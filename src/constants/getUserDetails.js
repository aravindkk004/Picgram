import axios from "axios";

export const userDetails = async (userId) => {
  try {
    const response = await axios.get(`/api/get-user-details/${userId}`);
    if (response.status == 200) {
      return response.data;
    } else {
      return "User not found";
    }
  } catch (error) {
    console.error("Error while fetching user details:", error); 
    return "Error while fetching User";
  }
};
