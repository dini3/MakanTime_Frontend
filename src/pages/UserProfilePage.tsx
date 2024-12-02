import { useGetMyUser, useUpdateMyUser } from '@/api/MyUserApi';
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm'

const UserProfilePage = () => {
    const {currentUser, isLoading: getLoading} = useGetMyUser();
    const {updateUser, isLoading: updateLoading} = useUpdateMyUser();

    if (getLoading){
        return <span>Loading. . .</span>
    }

    if (!currentUser)
        return <span>Unable to load user profile</span>

  return <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={updateLoading}/>;
}

export default  UserProfilePage