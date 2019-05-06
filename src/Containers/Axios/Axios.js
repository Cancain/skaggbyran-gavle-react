import axios from "axios";

export const wpInstance = axios.create({
  baseURL: "http://skaggbyrangavle.tomaseriksson.net/wp/wp-json"
});
