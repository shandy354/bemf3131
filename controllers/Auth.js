import User from "../model/userModel.js";
import argon2 from "argon2";


export const login = async(req, res) =>{
    const user = await User.findOne({
        where: {
            username: req.body.username   }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "wrong password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const username = user.username;
    const role = user.role;
    res.status(200).json({uuid, name, username, role});

}

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','username','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}