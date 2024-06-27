import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTQ5NTQ5OSwiZXhwIjoxNzE5NDk3Mjk5LCJpc3MiOiJzcC13aWtpZWQifQ.cNVaDnCuVdrAWeBFsqX2-FEwrT-ET60TVs3J0K9-IW4";
const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/6-7",
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
