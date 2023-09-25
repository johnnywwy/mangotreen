import { AxiosResponse } from "axios";
import { http } from "./Http";
import { Resource, User } from "../type/tags";

export let mePromise: Promise<AxiosResponse<Resource<User>>>

export const refreshMe = () => {
  mePromise = http.get<Resource<User>>('/me')
  return mePromise
}

export const fetchMe = refreshMe 
