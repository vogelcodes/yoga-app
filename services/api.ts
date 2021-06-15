import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://yoga-app.vogelcodes.com/api'
})
export const zoomAPI = axios.create({
    baseURL: 'https://api.zoom.us/v2',
    headers: {
        "Authorization": "Bearer " + process.env.ZOOM_API_JWT
    }
})