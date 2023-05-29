import { IFood } from "../interfaces/food.interface"
import { RequestType, sendRequest } from "./general.service"

export const createNewFood = async (userId: string, name: string, image: string, actualPrice: number, sellingPrice: number) => await sendRequest(`food/${userId}`, RequestType.POST, { name, image, actualPrice, sellingPrice })

export const updateFood = async (userId: string, foodId: string, props: object) => {
  console.log(`props`, props)
  return await sendRequest(`food/${userId}/${foodId}`, RequestType.PUT, props);
}

export const deleteFood = async (userId: string, foodId: string | undefined) => {
  await sendRequest(`food/${userId}/${foodId}`, RequestType.DELETE)
}

export const getFoodList = async (userId: string) => await sendRequest(`food/list/${userId}`, RequestType.GET)

export const getFood = async (userId: string, foodId: string) => await sendRequest(`food/${userId}/${foodId}`, RequestType.GET)