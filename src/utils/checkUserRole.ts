export const checkUserRole = (userRole:string | null | undefined) => {
  if(userRole === 'user' || !userRole) return 'Usuário'
  return userRole
}