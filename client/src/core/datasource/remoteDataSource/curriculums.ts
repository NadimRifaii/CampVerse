import { sendRequest } from "../../helpers/request"
type Curriculum = {
  curriculum: {
    stacks: {
      ID: number,
      name: string
    }[]
  }
}
export const curriculumsDataSource = {
  getCurriculums: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/curriculum",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  getWeekCurriculum: async (data: {}) => {
    try {
      const response: Curriculum = await sendRequest({
        body: data,
        route: "/curriculum/week-curriculum",
        method: "POST"
      })
      const stacks: { ID: number, name: string }[] = []
      if (response.curriculum.stacks)
        response.curriculum.stacks.map((stack, index) => {
          stacks.push(stack)
        })
      else {
        stacks.push({ name: "No stacks for this week", ID: 0 })
      }
      return stacks
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}