export const env = "vercel"

const url = {
  dev: "https://portfolio-fnju.onrender.com/api/",
  vercel: "https://portfolio-tau-five-51.vercel.app/api/"
}

const IMAGE = {
  dev: 'https://portfolio-fnju.onrender.com/images/',
   vercel: "https://portfolio-tau-five-51.vercel.app/api/"

}

export const BASE_URL = `${url[env]}`

export const IMAGEURL = `${IMAGE[env]}`
