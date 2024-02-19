var express = require('express');
var router = express.Router();

var date=require('date-and-time');  
const { ProductbuyingModel } = require('../modules/buyinggoods'); 
const{ProductModel}=require('../modules/product');
 const now = new Date();
 const ss=date.format(now, 'YYYY/MM/DD HH:mm:ss'); 
 
/* GET users listing. */ 


router.get('/get',  async function(req, res) {  
  try{
  const buyItem=await ProductbuyingModel.find();  
 
  if(buyItem){   
   

    res.status(200).send({buyItem,message:'buy data fetch sucess'})
   
  }else{  
    res.status(400).send({error:"product not available"})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});   


router.get('/get/:_id',  async function(req, res) {  
  try{
  const buyitem=await ProductbuyingModel.findOne({_id:req.params._id}); 
  if(product){  
    res.status(200).send({buyitem,message:'product data fetch sucess'})
   
  }else{  
    res.status(400).send({error:'product data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});   



router.delete('/delete/:_id',  async function(req, res) {  
  try{
  const user=await ProductbuyingModel.findOne({_id:req.params._id}); 
  if(user){   
    await ProductbuyingModel.deleteOne({_id:req.params.id})
    res.status(200).send({message:'buy data delete sucess'})
   
  }else{  
    res.status(400).send({error:'buy data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});  



router.post('/post',  async function(req, res) {  
  try{ 
   
  const buyItem= await ProductbuyingModel.create({addingproduct:req.body}); 
  const s=buyItem.addingproduct.map((item)=>{return  item}); 
  const ms=await ProductModel.find({productcode:s.map((item,index)=>item.productcode)})  
  ms.map((item,index)=>{ 
   if(s[index].productcode===item.productcode)
    {   
      
    ms[index].availableQty=(item.availableQty+(s[index].Qty))
     
    }
  
  } )
//ms.save()
     res.status(201).send({ms,buyItem,message:'product data post sucess'}) 
 
 } catch(error){ 
    res.status(500).send({error:'internal server error'})
  }
});   





module.exports = router;
