import axios from "axios";

// NOTE 테스트용 myToken, header
const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY1NjUzMCwiZXhwIjoxNzE5NjU4MzMwLCJpc3MiOiJzcC13aWtpZWQifQ.sH_uWwdMKNfkV6BWHqSAF_1njUeDZqLI9-LQM4d7fgg";
// note axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

export default instance;
