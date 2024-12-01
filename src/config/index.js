export const env = "dev"

const url = {
  dev: "https://portfolio-fnju.onrender.com/api/",
  vercel: "https://portfoliopowerdbyginil.vercel.app/"
}

const IMAGE = {
  dev: 'https://portfolio-fnju.onrender.com/images/',

}

export const BASE_URL = `${url[env]}`

export const IMAGEURL = `${IMAGE[env]}`