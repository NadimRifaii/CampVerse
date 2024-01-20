import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice";
import { updateUser } from "../../core/datasource/localDataSource/user/userSlice";
import { userDataSource } from "../../core/datasource/remoteDataSource/user";
import { CurrentUserContext } from "../../utils/contexts/current-user.context";
const useLogic = () => {
  // const user = useSelector(extractUserSlice)
  const currentUserContext = useContext(CurrentUserContext)
  const { currentUser: user } = currentUserContext
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  let defaultCredentials = {
    username: user?.username,
    email: user?.email,
    profilePicture: user?.profilePicture,
    firstname: user?.firstname,
    lastname: user?.lastname,
    role: user?.role,
    ...(user?.role === 'mentor' ? { speciality: user?.speciality } : {}),
    ...(user?.role === 'mentor' ? { position: user?.position } : {})
  }
  const [credentials, setCredentials] = useState(defaultCredentials)

  useEffect(() => {
    setPreviewImage(`${process.env.REACT_APP_SERVER_GO}/images/${user?.profilePicture}`);
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
        const response = await userDataSource.uploadImage(formData);
      } else {
        throw new Error("No file selected")
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfile = async () => {
    try {
      const response = await userDataSource.updateProfile(credentials)
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
  if (user?.role === 'mentor') {
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