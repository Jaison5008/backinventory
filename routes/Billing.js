var express = require('express');
var router = express.Router();

 
const {ProductsellingModel} =require('../modules/selling');
const{ProductModel}=require('../modules/product');
 
 
/* GET users listing. */ 


router.get('/get',  async function(req, res) {  
  try{
  const soldItems=await ProductsellingModel.find();  
 
  if(soldItems){    
  const sa=  await ProductsellingModel.aggregate(
      [
        {
          $group:
            {
              _id: { day: { $dayOfMonth: "$date"},month: { $month: "$date" } ,year: { $year: "$date" } },
              totalAmount: { $sum: "$total" },
              count: { $sum: 1 }
            }
        }
      ]
   ) 
   console.log(sa)
  
    res.status(200).send({soldItems,sa,message:'sold data fetch sucess'})
   
  }else{  
    res.status(400).send({error:"product not available"})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});   


router.get('/get/:_id',  async function(req, res) {  
  try{
  const solditem=await ProductsellingModel.findOne({_id:req.params._id}); 
  if(product){  
    res.status(200).send({solditem,message:'sold data fetch sucess'})
   
  }else{  
    res.status(400).send({error:'product data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});   



router.delete('/delete/:_id',  async function(req, res) {  
  try{
  const sold=await ProductsellingModel.findOne({_id:req.params._id}); 
  if(sold){   
    await sold.deleteOne({_id:req.params.id})
    res.status(200).send({message:'sold data delete sucess'})
   
  }else{  
    res.status(400).send({error:'buy data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});  



router.post('/post',  async function(req, res) {  
  try{ 
  const ss= req.body
const tot= (( ss.map((item)=> item.amount)).reduce((acc,item)=>acc+item))
  const soldItem= await ProductsellingModel.create({addproduct:req.body,total:tot});  

  const s=soldItem.addproduct.map((item)=>{return  item}); 
  const ms=await ProductModel.find({productcode:s.map((item,index)=>item.productcode)})  
  ms.map((item,index)=>{ 
   if(s[index].productcode===item.productcode)
    {   
      
    ms[index].availableQty=(item.availableQty-(s[index].Qty))

    }
  
  } )
//ms.save()
     res.status(201).send({ms,soldItem,message:'product data post sucess'}) 
 
 } catch(error){ 
    res.status(500).send({error:'internal server error'})
  }
});   






module.exports = router;
