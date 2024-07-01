import axios from "axios";

const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTgwOTMwNCwiZXhwIjoxNzE5ODExMTA0LCJpc3MiOiJzcC13aWtpZWQifQ.TTNgBqLNTEXC24xtD9dKM5DLQV9K1DqK0-QJoaD90c0";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

export default instance;
