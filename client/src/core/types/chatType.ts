export type ChatType = {
  _id: string,
  chatName: string,
  users: [{
    _id: string,
    email: string
  }],
  latestMessage: {
    _id: string,
    sender: {
      _id: string,
      email: string
    },
    content: string
  }

}