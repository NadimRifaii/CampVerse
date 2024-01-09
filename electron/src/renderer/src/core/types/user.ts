export type User = {
  username: string,
  firstname?: string,
  lastname?: string,
  email: string,
  role: "student" | "mentor" | "user",
  profilePicture: string,
  speciality?: string,
  position?: string
};
