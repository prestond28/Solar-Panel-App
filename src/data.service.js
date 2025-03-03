import { BASE_API_URL } from "./api.config";
import { _get } from "./service-helpers";

export const DATA_API = `${BASE_API_URL}/data`; // http://localhost:3000/api/tasks

export const getData = () => _get(DATA_API);