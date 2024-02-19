var mongoose=require('mongoose') 
 var date=require('date-and-time')  
 const now = new Date();
 const ss=date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
 
 let ItemSchema = new mongoose.Schema(
    {
       productname:{type:String,required:true}, 
       productcode:{type:String,required:true},  
       manufacturer:{type:String,default:'manufacuturer'},
       suplier:{ type:String,default:'man'}, 
       suplierEmail:{type:String,default:'man'},
       productDiscription:{type:String,default:'product'},   
      
       availableQty:{type:Number,min:0,default:0},
       productMrp:{type:Number,default:0}, 
       buyingPrice:{type:Number,default:0},  
       catagory:{type:String,default:0},
       createdAt:{type:String,default:ss} ,  
       updateAt:{type:String,default:ss},
    })
    

   
 

    
let ProductModel = mongoose.model('product',ItemSchema); 

module.exports={ProductModel};