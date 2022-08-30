

const isInvalidEmail = (value) => {
    if(value==='') return "Email is required";
    else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) && value.length > 5))     return "Incorrect email format";
    else return "";
}

const isInvalidName = (value) => {
      if(value==='') return "Name is required";
      else if(value.length < 2) return "Name is too short";
      else if (value.length > 20) return "Name is too long";
      else if (/\d/.test(value)) return "Name cannot contain numbers";
      else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) return "Name cannot contain special characters";
      else return "";
}

const isWeakPassword = (value) => {
   if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(value) && value.length >= 8)
      {
         const lowercase = (!/(?=.*[a-z])/.test(value))?  " lowercase letter,":"";
         const uppercase = (!/(?=.*[A-Z])/.test(value))?  " uppercase letter,":"";
         const number = (!/(?=.*[0-9])/.test(value))?  " number,":"";
         const special = (!/(?=.*[^A-Za-z0-9])/.test(value))?  " special character.":"";
         const msg = `Password must also contain at least one${lowercase}${uppercase}${number}${special}`;
         return msg.slice(0,-1);
      } 
      else return "";
   }

const isInvalidPassword = (value) => {
      if(value==='') return "Password is required";
      else if(value.length < 8) return "Password is too short";
      else if (value.length > 20) return "Password is too long";
      else return isWeakPassword(value)
}




export {isInvalidEmail, isInvalidName, isInvalidPassword, isWeakPassword};


       

   