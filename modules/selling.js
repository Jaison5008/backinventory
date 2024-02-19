var mongoose=require('mongoose') 
 var date=require('date-and-time')  
 const now = new Date();
 const ss=date.format(now, 'DD/MM/YYYY HH:mm:ss');    // => '2015/01/02 23:14:05'
 
 const iSchema = new mongoose.Schema(
    {
      productname:{type:String,required:true}, 
      productcode:{type:String,required:true},   
      Qty:{type:Number,required:true},  
      amount:{type:Number,required:true},
       } 
    ) 

    const sellSchema=new mongoose.Schema({addproduct:{type:[iSchema],default:null}, 
       total:{type:Number,default:0},
      date:{type:Date,default:Date.now()}, 
      createdAt:{type:String,default:ss}})
    


    
const ProductsellingModel = mongoose.model('sell',sellSchema);
module.exports={ProductsellingModel};