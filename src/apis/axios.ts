import axios from "axios";

const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTczOTQ5NCwiZXhwIjoxNzE5NzQxMjk0LCJpc3MiOiJzcC13aWtpZWQifQ.62ynVQGM8HMV61Lrxh_aAnwfKQJGp-hI2g-rgDTqPqQ";
// note axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

export default instance;
