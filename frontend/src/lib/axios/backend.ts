import axios from "axios"

const backend = axios.create({
  baseURL: "",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default backend
