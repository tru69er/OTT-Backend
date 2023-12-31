const jose = require("jose") //used as require here but imported in .ts file, check login route
const dotenv = require("dotenv")

dotenv.configDotenv()

//run file individually i.e. to see working node test.js
async function func() {

  //jwt secret is stored in .env file in encrypted form, decrypting it
  const secret = jose.base64url.decode(process.env.JWT_KEY)

  console.log(secret)

  //creating jwt
  const jwt = await new jose.EncryptJWT({ email: "chidori9912@gmail.com" }) //payload inside token
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" }) //algorithm to encrypt token
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setIssuedAt()
    .setExpirationTime("24h")
    .encrypt(secret) //key to encrypt token

  console.log("encrypted token to be sent to client", jwt)

  //decrypting jwt
  const payload = await jose.jwtDecrypt(jwt, secret)
  console.log("decrypted token after receiving from client", payload)


  const data = await fetch("http://localhost:6969/checkWatch?movie=2", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  console.log(data.status)
}

func()
