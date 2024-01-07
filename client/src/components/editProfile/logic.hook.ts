import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice";
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  useEffect(() => {
    setPreviewImage(`http://localhost:8000/images/${user.profilePicture}`);
  }, [user]);
  console.log(user)
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
  return { handleFileChange, previewImage, selectedFile }
}
export default useLogic