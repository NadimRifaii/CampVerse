import { updateUser } from "@renderer/core/datasource/localDataSource/user/userSlice";
import { userDataSource } from "@renderer/core/datasource/remoteDataSource/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { CurrentUserContext } from "@renderer/utils/contexts/current-user.context";

const useLogic = () => {
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const currentUserContext = useContext(CurrentUserContext)
  const { currentUser } = currentUserContext || {}

  let defaultCredentials = {
    username: currentUser?.username,
    email: currentUser?.email,
    profilePicture: currentUser?.profilePicture,
    firstname: currentUser?.firstname,
    lastname: currentUser?.lastname,
    ...(currentUser?.role === 'mentor' ? { speciality: currentUser?.speciality } : {}),
    ...(currentUser?.role === 'mentor' ? { position: currentUser?.position } : {}),
  }
  const [credentials, setCredentials] = useState(defaultCredentials)

  useEffect(() => {
    setPreviewImage(`http://localhost:8000/images/${currentUser?.profilePicture}`);
  }, [currentUser]);
  function resetCredentials() {
    setCredentials(defaultCredentials);
  }
  useEffect(() => {
    resetCredentials()
  }, [currentUser]);
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
      if (currentUser?.role == "admin") {
        dispatch(updateUser(credentials))
      } else {
        console.log("This user is not an admin")
      }
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
  if (currentUser?.role === 'mentor') {
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