import axios from "axios";

const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTczNTQ2OCwiZXhwIjoxNzE5NzM3MjY4LCJpc3MiOiJzcC13aWtpZWQifQ.auZbIbw4_VVoZ0Vs0fFr6RPyopERCdYvALCynnj67uQ";
// note axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

export default instance;
