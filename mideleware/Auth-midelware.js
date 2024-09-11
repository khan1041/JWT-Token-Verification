
const jwt=require('jsonwebtoken')

const Peraon=require('../Skima/Peraon')


const authmidelw=async(req,res,next)=>{
const token=req.header("Authorization")

if(!token){
  return res.status(401).json({msg:"not massage"})
}

console.log(token)
 const jwtToken=token.replace("Bar","").trim()
 console.log(jwtToken)
 try {
  const isvery=jwt.verify(jwtToken,process.env.JWT_SECRECT_KEY)
   console.log(isvery)

   const userData=await Peraon.findOne({email:isvery.email}).select({password:0})
    console.log(userData)
   req.user=userData
   req.token=token
   req.id=userData._id
    next()
} catch (error) {
 console.log(error)
  
 return res.status(401).json({msg:"error",error})
}


next()

}


module.exports=authmidelw








