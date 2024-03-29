import { useState} from 'react';
import { StyleSheet } from 'react-native';
import Pray from '../assets/Pray.svg';
import Relax from '../assets/Relax.svg';
import Study from '../assets/Study.svg';
import Work from '../assets/Work.svg';
import Sports from '../assets/Sports.svg';
import Eat from '../assets/Eat.svg';
import Drive from '../assets/Drive.svg';
import Bullet from '../assets/Bullet.svg';
import Chat from '../assets/Chat.svg';
import Clean from '../assets/Clean.svg';
import Meeting from '../assets/Meeting.svg';
import Program from '../assets/Program.svg';
import Research from '../assets/Research.svg';
import Watch from '../assets/Watch.svg';
import College from '../assets/College.svg';
import Games from '../assets/Games.svg';
import CPen from '../assets/CPen.svg';


export const findActionType = (text, actionObjects) => {
   const prayWords = ["pray", "recite", "mosque", "church", "quran", "bible"]
   const relaxWords = ["relax", "rest", "sleep", "slept", "nap", "procrastinate"]
   const studyWords = ["stud","memorize", "write", "solve", "learn", "exam", "test", "quiz",  "lecture", "sheet", "course", "read", "book"]
   const workWords = ["work", "job", "office", "business", "apply", "linkedin", "hire", "intern", "internship", "employ"]
   const sportWords = ["gym", "play", "ran","swam", "workout", "sport", "exercise", "run", "run", "walk", "swim", "cycle", "ball", "muscle", "worked out"]
   const eatWords = ["eat", "pizza", "dinner", "lunch", "breakfast", "snack", "meal", "food", "restaurant"]
   const driveWords = ["drive", "car", "bus", "taxi", "ride", "way", "drove", "transportation",  "went", "travel"]
   const chatWords = ["chat", "talk", "convers", "discuss", "converse", "conversation", "messenger", "whatsapp", "facebook", "instagram"]
   const cleanWords = ["clean", "wash", "tidy up", "organize", "fresh", "shower", ]
   const meetingWords = ["meet", "conferenc", "zoom", "video", "live", "visit"]
   const programWords = ["cod", "program", "git", "java", "tech", "app", "python"]
   const researchWords = ["search", "understand", "inqui", "find out", "fact", "google", "wiki"]
   const watchWords = ["watch", "movie", "show", "episode", "series", "episode", "watch", "netflix", "hulu", "amazon", "TV", "T.V.", "youtube"]
   const collegeWords = ["college", "uni", "school"]
   const gamesWords = ["game", "league", "video game", "fortnite", "dota", "lol", "playstation", "ps", "xbox"]
   let returnedValue = undefined;
      if (prayWords.some(x => text.toLowerCase().includes(x)))  returnedValue = actionObjects.find(i => i.name === "Praying")
      if (relaxWords.some(x => text.toLowerCase().includes(x))) returnedValue = actionObjects.find(i => i.name === "Relaxing")
      if (studyWords.some(x => text.toLowerCase().includes(x))) returnedValue = actionObjects.find(i => i.name === "Studying")
      if (gamesWords.some(x => text.toLowerCase().includes(x))) returnedValue = actionObjects.find(i => i.name === "Gaming");
      if (sportWords.some(x => text.toLowerCase().includes(x))) returnedValue = actionObjects.find(i => i.name === "Sports");
      if (workWords.some(x => text.toLowerCase().includes(x)))  returnedValue = actionObjects.find(i => i.name === "Working");
      if (eatWords.some(x => text.toLowerCase().includes(x)))   returnedValue = actionObjects.find(i => i.name === "Eating");
      if (collegeWords.some(x => text.toLowerCase().includes(x)))  returnedValue = actionObjects.find(i => i.name === "College");
      if (driveWords.some(x => text.toLowerCase().includes(x)))  returnedValue = actionObjects.find(i => i.name === "Driving");
      if (chatWords.some(x => text.toLowerCase().includes(x)))   returnedValue = actionObjects.find(i => i.name === "Chatting");
      if (cleanWords.some(x => text.toLowerCase().includes(x)))  returnedValue = actionObjects.find(i => i.name === "Cleaning");
      if (meetingWords.some(x => text.toLowerCase().includes(x)))returnedValue = actionObjects.find(i => i.name === "Meeting");
      if (programWords.some(x => text.toLowerCase().includes(x)))returnedValue = actionObjects.find(i => i.name === "Coding");
      if (researchWords.some(x => text.toLowerCase().includes(x)))  returnedValue = actionObjects.find(i => i.name === "Researching");
      if (watchWords.some(x => text.toLowerCase().includes(x)))  returnedValue = actionObjects.find(i => i.name === "Watching");
      if (!returnedValue) return actionObjects.find(i => i.name === "Other");    // We get here if we can't match to anything or if what should be matched for doesn't exist
      else return returnedValue;
}
   

   export const ActionType = ({index, stylesProp}) => {
         if (index == 0)  return <Pray width={24} height={24} style={stylesProp}/>;
         if (index == 1)  return <Relax width={24} height={24} style={stylesProp}/>;
         if (index == 2)  return <Study width={24} height={24} style={stylesProp}/>;
         if (index == 3)  return <Games width={24} height={24} style={stylesProp}/>;
         if (index == 4)  return <Sports width={24} height={24} style={stylesProp}/>;
         if (index == 5)  return <Work width={24} height={24} style={stylesProp}/>;
         if (index == 6)  return <Eat width={24} height={24} style={stylesProp}/>;
         if (index == 7)  return <College width={24} height={24} style={stylesProp}/>;
         if (index == 8)  return <Drive width={24} height={24} style={stylesProp}/>;
         if (index == 9)  return <Chat width={24} height={24} style={stylesProp}/>;
         if (index == 10)  return <Clean width={24} height={24} style={stylesProp}/>;
         if (index == 11)  return <Meeting width={24} height={24} style={stylesProp}/>;
         if (index == 12)  return <Program width={24} height={24} style={stylesProp}/>;
         if (index == 13)  return <Research width={24} height={24} style={stylesProp}/>;
         if (index == 14)  return <Watch width={24} height={24} style={stylesProp}/>;
         if (index == 15) return <Bullet width={24} height={24} style={stylesProp}/>;
         if (index == 16)  return <CPen width={24} height={24} style={stylesProp}/>;
      }


   export const findDuration = (text) => {
      if(!/\d/g.test(text))    return 0.0/6.0
      else {
         let hrs=0.0;
         let mins=0.0;
         if(text.toLowerCase().includes('hour')) {
            hrs =  text[text.indexOf('hour') - 2]
            let hrs_ = text[text.indexOf('hour') - 3]

            if(!/\d/g.test(hrs))    hrs = 0.0
            else {
               hrs = parseInt(hrs)
               if(/\d/g.test(hrs_))    hrs = hrs + parseInt(hrs_) * 10
            }
         }
         else if(text.toLowerCase().includes('hrs')) {
            hrs =  text[text.indexOf('hrs') - 2]
            let hrs_ = text[text.indexOf('hrs') - 3]
            if(!/\d/g.test(hrs)) hrs = 0.0
            else {
               hrs = parseInt(hrs)
               if(/\d/g.test(hrs_))    hrs = hrs + parseInt(hrs_) * 10
            }
         }
         if(text.toLowerCase().includes('min')) {
            mins =  text[text.indexOf('min') - 2]
            let mins_ = text[text.indexOf('min') - 3]
            if(!/\d/g.test(mins)) mins = 0.0
            else {
               mins = parseInt(mins)
               if(/\d/g.test(mins_))    mins = mins + parseInt(mins_) * 10
            }

            }
          return ((hrs) + (mins / 60.0))/6.0

         }
   }


   export const textDecorator = (text) => {
         if(text.toLowerCase().includes(' for ') )        return(text.slice(0, text.lastIndexOf("for ")));
         else if(text.toLowerCase().includes(' in ') )    return(text.slice(0, text.lastIndexOf("in ")));
         return text
   }


  export const convertDate = (dateString) => {
   const date = new Date(dateString);
   var day = date.getDate();
   var month = date.getMonth();
   var year = date.getFullYear();
   var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   if (day == 1 || day == 21 || day == 31) day = day + 'st';
   else if (day == 2 || day == 22) day = day + 'nd';
   else if (day == 3 || day == 23) day = day + 'rd';
   else day = day + 'th';
   return `${months[month]} ${day}, ${year} `;
 }
export const getDay=()=>{
 var now = new Date();
 var start = new Date(now.getFullYear(), 0, 0);
 var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
 var day = Math.floor((diff) / (1000 * 60 * 60 * 24));
   return day;
}


// function to return message based on time in the day
export const getGreeting = () => {
   const date = new Date();
   const hour = date.getHours();
   if (hour >= 4 && hour < 12) return 'Good Morning';
   else if (hour >= 12 && hour < 18) return 'Good Afternoon';
   else if (hour >= 18 && hour < 22) return 'Good Evening';
   else if (hour >= 22 || hour < 4) return 'Good Night';
   else return "Hmmmm."
}



// convert hex to hsv
export const hexToHsv = (hex) => {
   let r = parseInt(hex.substring(1, 3), 16) / 255;
   let g = parseInt(hex.substring(3, 5), 16) / 255;
   let b = parseInt(hex.substring(5, 7), 16) / 255;
   let max = Math.max(r, g, b);
   let min = Math.min(r, g, b);
   let h, s, l = max;
   let d = max - min;
   s = max == 0 ? 0 : d / max;
   if (max == min) {
      h = 0;
   } else {
      switch (max) {
         case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
         case g:
            h = (b - r) / d + 2;
            break;
         case b:
            h = (r - g) / d + 4;
            break;
      }
      h /= 6;
   }
   s = s*100;
   s = Math.round(s);
   l = l*100;
   l = Math.round(l);
   h = Math.round(360*h);
   return [h, s, l]

}



// function to find a random color
export const randomColor = () => {
   const letters = '0123456789ABCDEF';
   let color = '#';
   for (let i = 0; i < 6; i++) {
      let number = Math.floor(Math.random() * 16)
      number = number > 8 ? number - parseInt(number/3) : number;
      color += letters[number];
   }
   // make the color darker
   return color;
   }


// convert decimal hours to hours and minutes
export const convertToHours = (decimalHours) => {
   let hours = Math.floor(decimalHours);
   let minutes = Math.round((decimalHours - hours) * 60);
   if (minutes == 0)     return hours + 'h';
   else                  return `${hours}h ${minutes}m`;
}