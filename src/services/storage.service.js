import { updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateUserAvatar } from "./users.service";

export const storage = getStorage();

export const uploadAvatar = async (file, user, setLoading) => {
    try {
        const fileRef = ref(storage, user.uid + '.png');
    
        // setLoading(true);
    
        await uploadBytes(fileRef, file);
        const photoURL = getDownloadURL(fileRef);
    
        await updateProfile(user, { photoURL });
        await updateUserAvatar(user.username, photoURL);
    
        // setLoading(false);
    
        return photoURL;
    } catch (error) {
        console.error('Error uploading user avatar:', error.message);
        throw error; //should we do that?
    }
};