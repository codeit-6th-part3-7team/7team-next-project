import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTU0MzMxMSwiZXhwIjoxNzE5NTQ1MTExLCJpc3MiOiJzcC13aWtpZWQifQ.xwacVO5cZZ7HQ6oDNTdWKM_XQKpm5qZxf5j8tm3r4FY";
const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/6-7",
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
