import User from "../models/User.js"

//  aadhaar verification
const verifyUser=async(req,res)=>{
    // console.log("req.body:",req.body);
    
    const {userId,fullname,phone,aadhaarNumber,gender,dob }=req.body;
    // validate user
    if(!userId || !aadhaarNumber||!fullname ||!phone ||!gender|| !dob){
        return res.status(400).json({
            success:false,
            message:"Missing required user verification data",
        });
    }

    if(aadhaarNumber.length!==12 || !/^\d+$/.test(aadhaarNumber)){
        return res.status(400).json({
            success:false,
            message:"Invalid Aadhaar Number",
        });
    }

    // masked the number
    const maskedNumber=aadhaarNumber.slice(0,4)+"xxxxxxxxx";

    try{
        const user=await User.findOneAndUpdate(
            {userId},
            {
                fullname,
                phone,
                aadhaarNumber:maskedNumber,
                gender,
                dob,
                isUserVerified:true,
            },
            {new:true,upsert:true}
        );
        res.status(200).json({
            success:true,
            message:"Aadhaar Verified",
            user,
        });
    } catch (err){
        res.status(500).json({
            success:false,
            message: "Server error during verification"
        });
    }
};

export {verifyUser};