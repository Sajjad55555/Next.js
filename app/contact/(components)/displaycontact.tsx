import { contactType } from "@/app/(components)/comomtypes/comontypes"


export default function DisplayContact(props:contactType) {
  return (
   <>
      <div >
        <table>
          <tr>
           <th>Name</th>
           <th>Email</th>
           <th>Phone Number</th>
           <th>Message</th>
          </tr>
          {props.contactData.map((item, index)=>{
            return(
               <tr key={index}>
                <th>{item.name}</th>
                <th>{item.email}</th>
                <th>{item.Phone}</th>
                <th>{item.message}</th>
               </tr>
            )
           } )}
    
        </table>

      </div>
      </>
         
    

   
   
   
     
  )
}
