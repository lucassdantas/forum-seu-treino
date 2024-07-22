import { User} from "@/api/users/user";
import { DEFAULT_IMAGE_URL } from "@/constants";
import {createContext} from 'react'

export interface UserContextType {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUser: User = {
  userId: 0,
  userName: 'Não definido',
  userEmail: '@',
  userPhone: '',
  userBirthday: '0',
  userCoverImage: DEFAULT_IMAGE_URL,
  userProfileImage: DEFAULT_IMAGE_URL,
  userFollowers: 0,
  userSubjects: 0,
};

export const currentUserContext = createContext<UserContextType>({
  currentUser: defaultUser,
  setCurrentUser: () => {}
});