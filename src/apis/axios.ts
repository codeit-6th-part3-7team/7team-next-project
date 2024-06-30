import axios from "axios";

const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTczMjM4MiwiZXhwIjoxNzE5NzM0MTgyLCJpc3MiOiJzcC13aWtpZWQifQ.33XT487b2bXrVXBQQ8tF8odu_cs1GsqrTP_QUIg_QsQ";
// note axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

export default instance;
