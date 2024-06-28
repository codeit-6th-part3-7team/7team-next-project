import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTU1MDY5NSwiZXhwIjoxNzE5NTUyNDk1LCJpc3MiOiJzcC13aWtpZWQifQ.TPRFZwu8bc_Nu0GmWxbwTzBQWXL-QiGBfL62PbPlOh8";
const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/6-7",
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
