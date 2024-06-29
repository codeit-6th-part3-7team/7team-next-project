import axios from "axios";

const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTg5NCwiZXhwIjoxNzE5NjYzNjk0LCJpc3MiOiJzcC13aWtpZWQifQ.-3tlsBF_XcQMaWioCMzZeBJ0Pz8n58EkgmuZ3SrkCKo";
// note axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

export default instance;
