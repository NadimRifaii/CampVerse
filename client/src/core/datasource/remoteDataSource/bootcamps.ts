import { sendRequest } from "../../helpers/request"

export const bootcampsDataSource = {
  getBootcamps: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/bootcamp",
        method: "GET"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
  createBootcamp: async (data: {}) => {
    console.log(data)
    try {
      const response = await sendRequest({
        body: data,
        route: "/bootcamp",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
  addUserToBootcamp: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: '/bootcamp/add-user',
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}