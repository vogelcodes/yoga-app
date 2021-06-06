import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://yoga-app.vogelcodes.com/api'
})
export const zoomAPI = axios.create({
    baseURL: 'https://api.zoom.us/v2',
    headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlN2WXp2UWYxUnFhTDdXbXVycWlidmciLCJleHAiOjE2MjMwODkwNjIsImlhdCI6MTYyMjQ4NDI1OX0._hpuu7nI-8L84vtdXRpu5OaFZqYYbbEru4fMSj0hCJw"
    }
})