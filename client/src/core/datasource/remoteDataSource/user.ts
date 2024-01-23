import { sendRequest, sendFileRequest } from "../../helpers/request";
export const userDataSource = {
  getUser: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/user",
        method: "GET"
      })
      console.log(response)
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
  uploadImage: async (data: {}) => {
    try {
      const response = await sendFileRequest({
        body: data,
        route: "/user/profile",
        method: "POST"
      })
      return response;
    } catch (error: any) {
      throw new Error(error)
    }
  },
  uploadFile: async (data: { formData: any, name?: string }) => {
    try {
      const response = await sendFileRequest({
        body: data.formData,
        route: `/assignment/upload-file?substring=${data.name}`,
        method: "POST"
      })
      return response;
    } catch (error: any) {
      throw new Error(error)
    }
  },
  updateProfile: async (data: any) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/user",
        method: "PUT"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
  getAllBootcampUsers: async (data: { bootcampId: number }) => {
    try {
      const response = await sendRequest({
        body: data,
        route: `/bootcamp/${data.bootcampId}`,
        method: "GET"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }

}