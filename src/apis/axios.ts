import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTU2NjI5NywiZXhwIjoxNzE5NTY4MDk3LCJpc3MiOiJzcC13aWtpZWQifQ.8K9QYCOiN0uihTjmWpB-r5FTDMV_jIIENGcMII4mXUA";
const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/6-7",
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
