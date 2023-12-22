"use client"
import * as yup from "yup"
import { useState } from "react";
import DisplayContact from "../displaycontact";
import { log } from "console";
import { contactType, contactinfotype, onCahneEventType } from "@/app/(components)/comomtypes/comontypes";

const contactInfoSchema = yup.object().shape({
  name:yup.string().required().min(5).max(12),
  email:yup.string().required().email(),
  Phone:yup.number().required(),
  message:yup.string().required()
})
export default function ContactForm() {
    let [contactinfo, setcontactinfo] = useState<contactType>({
        name:"",
        email:"",
        Phone:0,
        message:""
    })
    const [errors, setError] = useState<contactType[]>([])
    
    let [contactList, setcontactList] = useState<contactType[]>([])

     const onChangeHandler = (event:onCahneEventType)=>{
      console.log("onChangeHandler call", event.target.name)
      let userDetail={
        ...contactinfo,
        [event.target.name]:event.target.value

      }
      setcontactinfo(userDetail)
    
     }

  const onClickHandler = async()=>{
    try{
      const result = await contactInfoSchema.validate(contactinfo) 
      
      if(!result){
        return
      }
       
    let newContactList:contactType[]=[...contactList , contactinfo]
    setcontactList(newContactList)
    // setError([])
    setcontactinfo({
      name:"",
      email:"",
      Phone:0,
      message:""
     })
    } catch(err){
    setError(err.errors)
    console.log("errors", err.errors)
    }
 
   
  }
 
  return (
   <>

 Contact 
    <form  className="max-w-md mx-auto">
      <div className="mb-4">
       
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
          Name
        </label>
        <input
        value={contactinfo.name}
        onChange={onChangeHandler}
          type="text"
          id="name"
          name="name"
       
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      

      <div className="mb-4">
      
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
        value={contactinfo.email}
        onChange={onChangeHandler}
          type="email"
          id="email"
          name="email"
        
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
       
       <label htmlFor="name" className="block text-sm font-medium text-gray-600">
        Phone Number
       </label>
       <input
       value={contactinfo.Phone}
       onChange={onChangeHandler}
         type="number"
         id="Phone"
         name="Phone"
      
         className="mt-1 p-2 w-full border rounded-md"
         required
       />
     </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-600">
          Message
        </label>
        <textarea
        value={contactinfo.message}
         onChange={onChangeHandler}
          id="message"
          name="message"
         
          rows={4}
          className="mt-1 p-2 w-full border rounded-md"
          required
        ></textarea>
      </div>
       {errors.map((item)=>{
        return(
          <div style={{color:"red"}}>
            <h1>{item}</h1>
          </div>
        )
       })}
      <button
      onClick={onClickHandler}
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
    <DisplayContact contactData={contactList}/>
    </>
  );
};

