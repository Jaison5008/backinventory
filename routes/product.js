var express = require('express');
var router = express.Router();
var {ProductModel}=require('../modules/product'); 
var date=require('date-and-time')  
 const now = new Date();
 const ss=date.format(now, 'YYYY/MM/DD HH:mm:ss'); 
 
/* GET users listing. */ 


router.get('/get',  async function(req, res) {  
  try{
  const products=await ProductModel.find();  
 
  if(products){   
    const danger=   await ProductModel.find({$or:[{catagory:"A" ,availableQty:{$lte:5}},{catagory:"B" ,availableQty:{$lte:20}}]})   
    const Excess=   await ProductModel.find({$or:[{catagory:"A" ,availableQty:{$gte:50}},{catagory:"B" ,availableQty:{$gte:100}}]}) 
    const stock=   await ProductModel.find({$or:[{availableQty:{$lte:0}}]})   
    const sto=stock.length  
    const dan=danger.length  
    const Exc=Excess.length
    const Pro=products.length
    res.status(200).send({products,danger,dan,Exc,Excess,sto,stock,Pro,message:'user data fetch sucess'})
   
  }else{  
    res.status(400).send({error:"product not available"})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});   


router.get('/get/:id',  async function(req, res) {  
  try{
  const product=await ProductModel.findOne({_id:req.params.id}); 
  if(product){  
    res.status(200).send({product,message:'product data fetch sucess'})
   
  }else{  
    res.status(400).send({error:'product data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});   



router.delete('/delete/:id',  async function(req, res) {  
  try{
  const user=await ProductModel.findOne({_id:req.params.id}); 
  if(user){   
    await UserModel.deleteOne({_id:req.params.id})
    res.status(200).send({message:'product data delete sucess'})
   
  }else{  
    res.status(400).send({error:'product data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});  



router.post('/post',  async function(req, res) {  
  try{
  const product=await ProductModel.findOne({productcode:req.body.productcode});  
  
  if(!product){   
    
   const product= await ProductModel.create(req.body)
   
    res.status(201).send({ product,message:'product data post sucess'})

  } else{  
    res.status(401).send({error:'product data alredy post'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server error'})
  }
});  
router.patch('/:_id',  async function(req, res) {   

const product=await ProductModel.findOne({_id:req.params._id});   
  try{
  if(product){    

   
  product.productMrp=req.body.productMrp, 
  product.buyingPrice=req.body.buyingPrice
  product.save()
  }else{

    res.status(401).send({error:'product not available'})
  }  
}catch(error){ 
    res.status(500).send({error:'internal server error'})
  }
});   
router.put('/edit',  async function(req, res) {   
    
   try{
  const n=req.body 
 
  const product=await ProductModel.find({productcode: n.map((s)=>{return s.productcode})});   
     
  
  if(product){    
  product.forEach((item,index)=>{ 
      if(n[index].productcode===item.productcode)
       {   
         
       (product[index].availableQty=n[index].availableQty)
       item.save()
        
       }
       
       
     } )
     

  
     res.status(200).send({ msage:'updated'})
    
  } 
  
  else{

    res.status(401).send({error:'product not available'})
  }  
}catch(error){ 
    res.status(500).send({error:'internal server error'})
  }
});  



router.put('/editbuy',  async function(req, res) {   
    
  try{
 const n=req.body 

 const product=await ProductModel.find({productcode: n.map((s)=>{return s.productcode})});   
    
 
 if(product){    
 product.forEach((item,index)=>{ 
     if(n[index].productcode===item.productcode)
      {   
        
      (product[index].availableQty=n[index].availableQty)
      item.save()
       
      }
      
      
    } )
    

 
    res.status(200).send({ msage:'updated'})
   
 } 
 
 else{

   res.status(401).send({error:'product not available'})
 }  
}catch(error){ 
   res.status(500).send({error:'internal server error'})
 }
});  

module.exports = router;
