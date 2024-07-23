import { currentUserContext } from '@/api/users/currentUserContext'
import { Banner } from '@/components/common/Banner'
import { PhotoFollowerAndSubjects } from '@/components/common/PhotoFollowerAndSubjects'
import { ConfigurationsBody } from '@/pages/Configurations/ConfigurationsBody'
import { useContext } from 'react'

export const Configurations = () => {
  const currentUser = useContext(currentUserContext)

  return (
    <>
    <Banner/>
    <PhotoFollowerAndSubjects followers={currentUser.userFollowers} subjects={currentUser.userSubjects} profilePhoto={currentUser.userProfileImage} profileName={currentUser.userName}/>
    <ConfigurationsBody/>
    </>
  )
}
