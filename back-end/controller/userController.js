const User = require('../model/user');
const bcrypt = require('bcrypt/bcrypt');

const createUser = async (req,res,next)=>{
    try{
        const salt = await bcrypt.genSalt();
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.password = await bcrypt.hash(req.body.password,salt);
        user.question = req.body.question;
        user.answer = req.body.answer;
        await user.save();
        return res.json("user added");

    }catch(err){
        console.log(err);
    }
}


const checkMail = async(req,res,next)=>{
    try{
        const emailId = req.query.email;
        // console.log(emailId);
        const check = await User.findOne({email: emailId});
        return res.json(check)
    }
    catch(err){
        console.log(err)
    }
}

const login = async (req,res,next) =>{

    try{
        emailId = req.body.email;
        pass = req.body.password;
        const check = await User.findOne({email: emailId});
        if(check !=null){
            if(await bcrypt.compare(pass,check.password)){
                res.send({msg:"success",id:check._id})
            }
            else{
                res.send({msg:"failed"})
            }
        }
        else{
            res.send({msg:"invalid"})
        }
        
    }
    catch(err){  
        console.log(err)
    }
}

const reset = async (req,res,next) =>{
    try{
        emailId = req.body.email;
        quest = req.body.question;
        ans = req.body.answer;
        const check = await User.findOne({email: emailId});
        if(check !=null){
            if(check.question === quest && check.answer === ans){
                res.send({msg:"success",email:check.email})
            }
            else{
                res.send({msg:"failed"})
            }
        }
        else{
            res.send({msg:"invalid"})
        }
    }
    catch(err){
        console.log(err)
    }
}

    const updatePassword = async (req,res,next) =>{
        try{
            const salt = await bcrypt.genSalt();
            emailId = req.body.email;
            pass = await bcrypt.hash(req.body.password,salt); 
            console.log(emailId);
            console.log(pass)
            const update = await User.updateOne({email: emailId},{$set:{password: pass}});
            return res.json(update);

        }   
        catch(err){
            console.log(err)
        }
    }


module.exports ={
    createUser,
    checkMail,
    login,
    reset,
    updatePassword
}