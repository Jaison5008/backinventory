var bcrypt=require('bcrypt'); 
var jwt=require('jsonwebtoken'); 
const secrete='jaison'

const hashpassword= async (payload)=>{   
const salting= await bcrypt.genSalt(5)
 const hashed= await  bcrypt.hash(payload,salting) 
 return hashed

}  

    const token=async(payload)=>{ 
    const tokens=await jwt.sign(payload,secrete,{expiresIn:'2m'}) 
    return tokens;
}  
const tokening=async(payload)=>{ 
  const tokens=await jwt.sign(payload,secrete,{expiresIn:'10m'}) 
  return tokens;
}  

const compareing=async(password,bodypassword)=>{   
const compared= await bcrypt.compare(bodypassword,password)  
return compared 
 }   
 const validates=async(val)=>{    
  console.log(val)
      const decodedata=  await jwt.decode(val)  
      console.log(decodedata)
   if((((+new Date())/1000)<decodedata.exp)){ 
    
     return  true
  }else{ return false} 
}
      
  
/*const forgetvalidate=async(val)=>{ 
      const data=req.headers.authorization.split(" ")[1] 
    const decodedata=await secrete.decode(val)
      if((((+new Date())/1000)<decodedata.exp)){
        res.status(200).send({message:"sucess"})
    }else{res.status(401).send({error:"time expired"})} 
  

  
}

const validate=async(req,res,next)=>{    
  try{
   if(req.headers.authorization){
      const data=req.headers.authorization.split(" ")[1] 
      const decodedata=  await tokenscreate.decode(data) 
   if((((+new Date())/1000)<decodedata.exp)){
      next();
  }else{res.status(401).send({error:"time expired"})} 
}else{ 
  res.status(401).send({error:"time expired"})
}
  }catch(error){ 
      (res.status(500).send({error:'server error'}))
  }
}*/
 module.exports= {hashpassword,token,compareing,tokening,validates};