const TOKEN_KEY = 'jwt'

export const login = () => {
  localStorage.setItem(TOKEN_KEY, 'TestLogin')
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true
  }

  return false
}

// Local Domain
export const DOMAIN = 'http://localhost:8000/' // 'https://127.0.0.1:8000/' 
export const DOMAIN_FRONT = 'http://localhost:3000/'

// Production Domain
// export const DOMAIN = 'https://dvhrt.herokuapp.com/'
// export const DOMAIN_FRONT = 'https://dvhrt.herokuapp.com/'