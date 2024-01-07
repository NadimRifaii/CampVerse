import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice";
import { updateUser } from "../../core/datasource/localDataSource/user/userSlice";
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  let defaultCredentials = {
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    firstname: user.firstname,
    lastname: user.lastname,
    ...(user.role === 'mentor' ? { speciality: user.speciality } : {}),
  }
  const [credentials, setCredentials] = useState(defaultCredentials)
  useEffect(() => {
    setPreviewImage(`http://localhost:8000/images/${user.profilePicture}`);
  }, [user]);
  function resetCredentials() {
    setCredentials(defaultCredentials);
  }
  useEffect(() => {
    resetCredentials()
  }, [user]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  };
  const fields = [
    {//
      label: 'UserName',
      name: 'username',
      type: 'text',
      value: credentials.username || ''
      ,
      onChange: changeHandler
    },
    {
      label: "FirstName",
      name: "firstname",
      type: 'text',
      value: credentials.firstname || ''
      ,
      onChange: changeHandler
    },
    {
      label: "LastName",
      name: "lastname",
      type: 'text',
      value: credentials.lastname || ''
      ,
      onChange: changeHandler
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: credentials.email || ''
      ,
      onChange: changeHandler
    }
  ]
  if (user.role === 'mentor') {
    fields.push(...[{
      label: "Speciality",
      name: "speciality",
      type: "text",
      value: credentials.speciality || ''
      ,
      onChange: changeHandler
    }])
  }
  return { handleFileChange, previewImage, selectedFile, fields, resetCredentials }
}
export default useLogic