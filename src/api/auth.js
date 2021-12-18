import Cookies from 'utils/Cookies'
//import defaultUser from '../utils/default-user';
const authURL = process.env.REACT_APP_BACKEND_API

export async function signIn(email, password) {
  try {
    //const [cookies, setCookie] = useCookies(["gsafety"]);
    // Send request
    let token, message = ''
    const postData = { identifier: email, password: password  }
    const result = fetch(`${authURL}/auth/local`, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers:{
          'Content-Type': 'application/json',
          //'Authorization': 'Bearer ' + token
      }
    })
      .then( (response) => response.json())
      .then(res => {
          if (res && res.jwt) {
            //console.debug(' login ', JSON.stringify(res))
            token = res.jwt
            message = 'Logged in'
            //setCookie("gsafety", token, { path: "/" });
            //const { _id, username, firstname, lastname, email, avatarUrl, roles, department, company } = res.user
            //const avatarFullUrl = process.env.REACT_APP_BACKEND_API + '/uploads/asset/' + avatarUrl.fileName
            //const avatarFullUrl = 'avatarurl'

            //const user = { _id, username, firstname, lastname, email, roles, department, company, avatarUrl, avatarFullUrl }
            //const userCookie = { _id, username, firstname, lastname, email, roles, company, avatarUrl, avatarFullUrl }
            Cookies.setCookie('token', token, 1);
            Cookies.setCookie('user', JSON.stringify(res.user))
            return { data: res.user, token: token, isOk: true }
          }
          else {
            //return res.error
            console.debug(' login error ', JSON.stringify(res))
            return res
          }
      })
      .catch(error => {
          console.debug(' Error: ' + JSON.stringify(error))
          message = error.message
          return { message: error, isOk: false }
      })

    //console.debug(' login ' + JSON.stringify(result));

    return result
  }
  catch(error) {
    return {
      isOk: false,
      message: "Authentication failed " + error
    };
  }
}

export function getUser() {
  return localStorage.getItem('user');
  // try {
  //   //const [cookies, getCookie] = useCookies(["gsafety"])
  //   let token = null
  //   // Send request
  //   //getCookie("gsafety", token, {
  //   //  path: "/"
  //   //});
  //   //console.debug('cookie ' + JSON.stringify(cookies.gsafety))
  //   const userStr = localStorage.getItem('user')
  //   console.debug(JSON.parse(userStr))
  //   if (userStr)
  //     return {
  //       isOk: true,
  //       data: JSON.parse(userStr).user
  //     }
  //   else
  //     return {
  //       isOk: false
  //     };
  // } catch {
  //   return {
  //     isOk: false,
  //   };
  // }
}

export const getToken = () => {
  //return sessionStorage.getItem('token') || null;
  return Cookies.getCookie('token') || null;
}

export async function hasRole(role) {
  let isRole = false
  let data = null
  try {
    const userStr = getToken()
    if (userStr)
      data = JSON.parse(userStr)
      console.debug('  current User Role : ' + JSON.stringify(data.roles))
      data.roles.map((userRole) => {
        if (userRole.code && userRole.code == role) {
          //console.debug(" has Role : " + role)
          isRole = true
        }
    })

    return isRole
  }
  catch {
    return isRole
  }
}

export async function createAccount(postData) {
  try {
    let message = ''
    //const postData = {username: username, email: email, password: password  }
    const result = fetch(`${authURL}auth/register`, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers:{
          'Content-Type': 'application/json'
      }
    })
      .then( (response) => response.json())
      .then(res => {
          if (res.data) {
            //console.debug(res.data)
            const { _id, username, email } = res.data.items
            const user = { _id, username, email }
            return { data: user, isOk: true }
          }
          else
            //return res.error
            return res
          })
          .catch(error => {
              message = error.message
              return { message: error, isOk: false }
          })
    return result
  }
  catch {
    return {
      isOk: false,
      message: "Failed to create account"
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    //console.debug(email, recoveryCode);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  };
}

export async function resetPassword(email) {
  try {
    // Send request
    //console.debug(email);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}
