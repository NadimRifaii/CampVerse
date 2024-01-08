import { extractUserSlice, updateUser } from "@renderer/core/datasource/localDataSource/user/userSlice";
import { userDataSource } from "@renderer/core/datasource/remoteDataSource/user";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
    ...(user.role === 'mentor' ? { position: user.position } : {})
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
  useEffect(() => {
    if (selectedFile) {
      setCredentials({ ...credentials, ['profilePicture']: selectedFile.name })
      uploadImage()
    }
  }, [selectedFile])
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
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
        await userDataSource.uploadImage(formData);
      } else {
        throw new Error("No file selected")
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfile = async () => {
    try {
      await userDataSource.updateProfile(credentials)
      dispatch(updateUser(credentials))
    } catch (error) {
      console.log(error)
    }
  }
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
      value: credentials.lastname || '',
      onChange: changeHandler
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: credentials.email || '',
      onChange: changeHandler,
      disabled: true
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
    }, {
      label: "Position",
      name: "position",
      type: "text",
      value: credentials.position || ''
      ,
      onChange: changeHandler
    }])
  }
  return { handleFileChange, previewImage, selectedFile, fields, resetCredentials, updateProfile }
}
export default useLogic