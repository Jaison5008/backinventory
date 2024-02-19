var express = require('express');
var router = express.Router();

var date=require('date-and-time');  
const {orderModel} = require('../modules/ordergoods'); 
 const now = new Date();
 const ss=date.format(now, 'YYYY/MM/DD HH:mm:ss'); 
 
/* GET users listing. */ 


router.get('/get',  async function(req, res) {  
  try{
  const orderedItems=await orderModel.find();  
 
  if(orderedItems){   
   

    res.status(200).send({buyItem,message:'ordered data fetch sucess'})
   
    
  }else{  
    res.status(400).send({error:"order not available"})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});   


router.get('/get/:_id',  async function(req, res) {  
  try{
  const orderitem=await orderModel.findOne({_id:req.params._id}); 
  if(product){  
    res.status(200).send({orderitem,message:'product data fetch sucess'})
   
  }else{  
    res.status(400).send({error:'order data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});   



router.delete('/delete/:_id',  async function(req, res) {  
  try{
  const order=await orderModel.findOne({_id:req.params._id}); 
  if(order){   
    await orderModel.deleteOne({_id:req.params.id})
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
  const orderItem= await orderModel.create(req.body)  
  
  res.status(201).send({ orderItem,message:'product data post sucess'})
 } catch(error){ 
    res.status(500).send({error:'internal server error'})
  }
});   





module.exports = router;
