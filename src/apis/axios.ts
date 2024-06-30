import axios from "axios";

const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTczMzQ4NSwiZXhwIjoxNzE5NzM1Mjg1LCJpc3MiOiJzcC13aWtpZWQifQ.IPjhKbNP4pDcA9a22mN0uURz_ukUKQFI0VtLJTey4Vw";
// note axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

export default instance;
