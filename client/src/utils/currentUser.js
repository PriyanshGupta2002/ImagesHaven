export const giveCurrentUser = ()=>{
    return JSON.parse(localStorage.getItem('currentUser'))
}