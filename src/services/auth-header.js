export default function authHeader() {
    const userData = JSON.parse(localStorage.getItem('user'));
  
    if (userData && userData.jwt) {
        return { Authorization: 'Bearer ' + user.jwt }
    } else {
      return {};
    }
}