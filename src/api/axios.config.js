import axios from "axios";

export const axiosInstance=axios.create({
	baseURL:"https://zerie-fullstack-reactjs-strapi.onrender.com"
})