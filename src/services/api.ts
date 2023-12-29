import axios from 'axios'
import { IComments } from '../interfaces/IComments'

const BASE_URL : string = 'https://dummyjson.com/comments?limit=10'
export const retrieveComments = (skip : number) => axios.get(`${BASE_URL}&skip=${skip}`)
