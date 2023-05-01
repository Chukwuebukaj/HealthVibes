import { readFile, writeFile, existsSync} from 'fs'
import { appendFile } from 'fs/promises'
import {sign, verify} from 'jsonwebtoken'
import express, {Request, Response, NextFunction} from 'express'


interface DoctorsAttributes {
    Id: any;
    Name: string;
    email: string;
    gender: string;
    country: string;
    city: string;
    emergencyContact: string;
    interest: string;
    hashedPassword: string;
    
}

export const userProfile = {
    Id: '',
    Name: '',
    email: '',
    gender: '',
    country: '',
    city: '',
    emergencyContact: '',
    interest: '',
    hashedPassword: ''

}


export const saveFile = async(database: any) => {
    const data = JSON.stringify(database, null, 2)
    writeFile('database.sqlite', data, (error) => {
       if (error) {
           console.log(error)
       }else{
           console.log('Data saved in Database')
       }
    })
}
export const openFile = (database: any) => {
   readFile(database, 'utf-8', (error, data) => {
       if (error) {
           console.log(error)
       }else{
           return JSON.parse(data)
       }
   })
}
export const appendToDatabase = async(database: any, newData: any) => {
   const exists = existsSync(database)
   if (exists) {
       const data = JSON.stringify(newData)
       await appendFile(database, data,  'utf-8')
   }
   else{
       throw new Error
   }

}
export const fileExistence = async(database: any) => {
   const exists = existsSync(database)
   return exists
}



export const createToken = (username: string, id: string) => {
   const token = sign({
       username: username,
       id: id
   }, 'thisIsACommonSecret')
   return token
}
export const validateToken = (req: any, res: any, next: any) => {
   try{
       let token = req.cookies['invisibleToken']
       if(!token) {
           req.authenticated = true
           res.status(403)
           res.render('login', { errMessage: "Session time Ended, Login again" })
       }else{
           let validator = verify(token, "thisIsACommonSecret")
           if(validator) {
               return next()
           }else{
               res.render('login')
           }
       }

   }catch(err){
       if(err){
           console.log(err)
       }
   }
}