import axios from 'axios';

const fonasaApi = axios.create({
  baseURL: import.meta.env.VITE_FONASA_API_URL,
});

//TODO: Interceptors

export { fonasaApi };
