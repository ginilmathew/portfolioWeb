export const env = "vercel"

const url = {
  dev: "https://portfolio-fnju.onrender.com/api/",
  vercel: "https://portfolio-dtga8e9n7-ginilmathew3s-projects.vercel.app/"
}

const IMAGE = {
  dev: 'https://portfolio-fnju.onrender.com/images/',
   vercel: "https://portfolio-dtga8e9n7-ginilmathew3s-projects.vercel.app/"

}

export const BASE_URL = `${url[env]}`

export const IMAGEURL = `${IMAGE[env]}`
