var mongoose=require('mongoose') 
 var date=require('date-and-time')  
 const now = new Date();
 const ss=date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
 
 const ItemSchema = new mongoose.Schema(
    {
      productname:{type:String,required:true}, 
       productcode:{type:String,required:true},  
        
       Qty:{type:Number,default:0},  
       
    
    } 
    ) 

    const orderSchema=new mongoose.Schema({addingproduct:{type:[ItemSchema],default:null},createdAt:{type:String,default:ss}})
    


    
const orderModel = mongoose.model('add',orderSchema);
module.exports={orderModel};