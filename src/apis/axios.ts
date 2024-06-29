import axios from "axios";

const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY1Nzk2MSwiZXhwIjoxNzE5NjU5NzYxLCJpc3MiOiJzcC13aWtpZWQifQ.i5pZ6nOqJkaybMn0LktzewoH1BfnfSZQUI8eOZOQRoA";
// note axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

export default instance;
