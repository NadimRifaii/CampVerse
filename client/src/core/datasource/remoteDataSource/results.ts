import { sendRequest } from "../../helpers/request";

export const resultsDatasource = {
  getBootcampResults: async (data: { bootcampId: number }) => {
    try {
      const response = await sendRequest({
        body: data,
        route: `/result/${data.bootcampId}`,
        method: "GET"
      })
      console.log(response)
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}