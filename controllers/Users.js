import User from "../model/userModel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) =>{
    const {name, username, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            username: username,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async (req, res) =>{
 
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
        const {name, username, password, confPassword, role} = req.body;
        let hashPassword;
        if(password === "" || password === null) {
            hashPassword = user.password
        }else{
            hashPassword = await argon2.hash(password);
        }
        if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"})
        try {
            await User.update({
                name: name,
                username: username,
                password: hashPassword,
                role: role
            },{
                where:{
                    id: user.id
                }
            });
            res.status(200).json({msg: "Berhasil update user"});
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
}

export const deleteUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}