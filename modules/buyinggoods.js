var mongoose=require('mongoose') 
 var date=require('date-and-time')  
 const now = new Date();
 const ss=date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
 
 const itemSchema = new mongoose.Schema(
    {
      productname:{type:String,required:true}, 
       productcode:{type:String,required:true},  
       Qty:{type:Number,default:0},  
       
    
    } 
    ) 

    const buySchema=new mongoose.Schema({addingproduct:{type:[itemSchema],require:true},createdAt:{type:Date,default:Date.now()}})
    


    
const ProductbuyingModel = mongoose.model('buy',buySchema);
module.exports={ProductbuyingModel};