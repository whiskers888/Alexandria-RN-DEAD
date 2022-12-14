import * as SecureStore from 'expo-secure-store'; // шифрование


const testHost = 'https://test.mmis.ru'
const originalHost = 'https://stud.sssu.ru'
const host = originalHost


async function storeToken(token) {
    try{
       await SecureStore.setItemAsync('secure_token', token);
    } catch (e) {
      console.log('cant save token' + e)
    }
  };

export async function clearToken() {
    return await SecureStore.deleteItemAsync('secure_token')
}

export async function getToken(){
  return await SecureStore.getItemAsync('secure_token')
      
}

export default function useToken(username,password) {

    let URL =  host + '/api/tokenauth'
    return fetch(URL, {
        method:'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'userName':username,
          'password':password
        })
    }).then(res => res.json()).then(res => {
      if (res.data.accessToken !== null && res.state == '1') {
          clearToken()
          storeToken(res.data.accessToken)
      }
    }
    )
  }

  export function getUserID(){
    let URL = host + '/api/tokenauth'
    return getToken().then(value =>{
      return fetch(URL, {
          headers: {
              'Cookie': 'authToken='+value
          }
      }).then(res => res.json()).then(res => {
        return res.data.user.userID
      })
    })
  }
  
export function getNews () {
    let URL = host + '/api/Feed?'
    return getToken().then(value =>{
      return fetch(URL, {
        headers:{
            'Cookie': 'authToken='+value // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3R1ZGVudCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiLQkNCy0LXRgtC40YHRj9C9INCuLtCtLiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2hhc2giOiIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiItNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdXNlcmRhdGEiOiIyIiwidmVyaWZTdHJpbmciOiIiLCJuYmYiOjE2NjEwMzYwODIsImV4cCI6MTY2MTY0MDg4MiwiaXNzIjoiVmVkS2FmIiwiYXVkIjoiTU1JU0xhYiJ9.KmEYkTUK7sdgoLOAtOfE6o6eZHTmh1kh9-vWR0i6Qog
        }
    }).then(res => res.json()).then(res => {
        return res.data.feed
    })
    })
    
}

export function checkNews(){
      let URL = host + '/api/Feed/DateViewed'
      return getToken().then(value =>{
        fetch(URL, {
            method:'POST',
            headers: {
                Cookie: 'authToken='+value,
                Origin:'https://test.mmis.ru',
                Host:'test.mmis.ru'
            },
            body: JSON.stringify({
                'data':null,
                'msg':'Лента',
                'state':1
            })
        })
      })
  }

     // Получение оценок
export function getGradeBook(){
  let URL = host + '/api/EducationalActivity/ZachBook?'
  return getToken().then(value =>{
    return fetch(URL, {
        headers: {
            'Cookie': 'authToken='+value
        }
    }).then(res => res.json()).then(res => {
        return res
    })
  })
} 

// Починить выдачу ID
export function getInfoStudent(){
  let URL = host + '/api/UserInfo/Student?studentID=-73988'//-73988
  console.log(URL)
  return getToken().then(value =>{
    return fetch(URL, {
        headers: {
            'Cookie': 'authToken='+value
        }
    }).then(res => res.json()).then(res => {
      // console.log(res.data)
      return res.data
    })
  })
}

export function checkMail(){
  let URL = host + '/api/Mail/CheckMail'
  return getToken().then(value =>{
    return fetch(URL, {
        headers: {
            'Cookie': 'authToken='+value
        }
    }).then(res => res.json()).then(res => {
      return res.data.count
    })
  })
}

export function getInboxMail(type){
  let URL = host + '/api/Mail/InboxMail?page=1'
  return getToken().then(value =>{
    return fetch(URL, {
        headers: {
            'Cookie': 'authToken='+value
        }
    }).then(res => res.json()).then(res => {
        return res.data.messages
      })
  })
}

export function getOutMailFromServer(){
  let URL = host + '/api/Mail/InboxMail?type=1&page=1'
  return getToken().then(value =>{
    return fetch(URL, {
        headers: {
            'Cookie': 'authToken='+value
        }
    }).then(res => res.json()).then(res => {
      return res.data.messages
    })
  })
} 


