import axios from "axios";

export const wpInstance = axios.create({
  baseURL:
    "http://localhost/skaggbyran-gavle-react/WordPress/wp-admin/wp-json/v2"
});
