
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import productModel from '../models/productModel.js';
import { error } from 'console';
// function for adding product



const addProduct= async (req,res)=>{
    console.log("FILES RECEIVED:", req.files);

    try{
        const {name, description,price, category, subCategory, sizes, bestseller}=req.body;

        const image1=req.files.image1 && req.files.image1?.[0];
        const image2=req.files.image2 && req.files.image2?.[0];
        const image3=req.files.image3 && req.files.image3?.[0];
        const image4=req.files.image4 && req.files.image4?.[0];

        const images=[image1,image2,image3,image4].filter((item)=> item!== undefined);

        const imagesUrl = await Promise.all(
            images.map(async (item)=>{
                    let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                    fs.unlinkSync(item.path);
                    return result.secure_url;
            })
        )

          const productData = {
  name,
  description,

  // normalize category for exact match with frontend filters
  category: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
  subCategory: subCategory.charAt(0).toUpperCase() + subCategory.slice(1).toLowerCase(),

  price: Number(price),

  // handle boolean or string both
  bestseller: bestseller === true || bestseller === "true",

  // handle string or array both
  sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes,

  image: imagesUrl,
  date: Date.now(),
};
           console.log(productData);

           const product = new productModel(productData);

           await product.save()

         res.status(201).json({
      success: true,
      message:"Product added",
    //   product: {
    //     name,
    //     description,
    //     price,
    //     category,
    //     subCategory,
    //     sizes,
    //     bestseller,
    //     images: imagesUrl
    //   }
    });
        

    }catch(error){
        console.log(error)
            res.json({success:false,message:error.message})
            
    }

}




// function for list products

const listProduct= async (req,res)=>{

        try{
            const products= await productModel.find({});
            res.json({success:true,products:products})

        }catch(error){
             console.log(error)
            res.json({success:false,message:error.message})

        }


}


// function for removing products
const removeProduct=async (req,res)=>{

    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product removed"})

    }catch(error){
         console.log(error)
            res.json({success:false,message:error.message})

    }




}


// function for sigle product info

const singleProduct= async(req,res)=>{

    try{
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true,product})

    }catch(error){
         console.log(error)
            res.json({success:false,message:error.message})

    }




}



export {listProduct,removeProduct,singleProduct,addProduct};