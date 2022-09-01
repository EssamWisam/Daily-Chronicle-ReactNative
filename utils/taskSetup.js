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
import Light from '../assets/light.svg';


export const findActionType = (text) => {
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
      if (prayWords.some(x => text.toLowerCase().includes(x)))  return 0;
      if (relaxWords.some(x => text.toLowerCase().includes(x))) return 1;
      if (studyWords.some(x => text.toLowerCase().includes(x))) return 2;
      if (gamesWords.some(x => text.toLowerCase().includes(x))) return 3;
      if (sportWords.some(x => text.toLowerCase().includes(x))) return 4;
      if (workWords.some(x => text.toLowerCase().includes(x)))  return 5;
      if (eatWords.some(x => text.toLowerCase().includes(x)))   return 6;
      if (collegeWords.some(x => text.toLowerCase().includes(x)))  return 7;
      if (driveWords.some(x => text.toLowerCase().includes(x)))  return 8;
      if (chatWords.some(x => text.toLowerCase().includes(x)))   return 9;
      if (cleanWords.some(x => text.toLowerCase().includes(x)))  return 10;
      if (meetingWords.some(x => text.toLowerCase().includes(x)))return 11;
      if (programWords.some(x => text.toLowerCase().includes(x)))return 12;
      if (researchWords.some(x => text.toLowerCase().includes(x)))  return 13;
      if (watchWords.some(x => text.toLowerCase().includes(x)))  return 14;
      else return 15
   }

   export const ActionType = ({index}) => {
         if (index == 0)  return <Pray width={24} height={24} style={styles.itemStyle}/>;
         if (index == 1)  return <Relax width={24} height={24} style={styles.itemStyle}/>;
         if (index == 2)  return <Study width={24} height={24} style={styles.itemStyle}/>;
         if (index == 3)  return <Games width={24} height={24} style={styles.itemStyle}/>;
         if (index == 4)  return <Sports width={24} height={24} style={styles.itemStyle}/>;
         if (index == 5)  return <Work width={24} height={24} style={styles.itemStyle}/>;
         if (index == 6)  return <Eat width={24} height={24} style={styles.itemStyle}/>;
         if (index == 7)  return <College width={24} height={24} style={styles.itemStyle}/>;
         if (index == 8)  return <Drive width={24} height={24} style={styles.itemStyle}/>;
         if (index == 9)  return <Chat width={24} height={24} style={styles.itemStyle}/>;
         if (index == 10)  return <Clean width={24} height={24} style={styles.itemStyle}/>;
         if (index == 11)  return <Meeting width={24} height={24} style={styles.itemStyle}/>;
         if (index == 12)  return <Program width={24} height={24} style={styles.itemStyle}/>;
         if (index == 13)  return <Research width={24} height={24} style={styles.itemStyle}/>;
         if (index == 14)  return <Watch width={24} height={24} style={styles.itemStyle}/>;
         if (index == -1)  return <Light width={24} height={24} style={styles.itemStyle}/>;
         else return <Bullet width={24} height={24} style={styles.itemStyle}/>;

      }


const styles = StyleSheet.create({
   itemStyle: {
      width: 24,
      height: 24,
      color: '#f2f3f4',
      marginRight: 13,
      marginLeft: 13
  },
 
   });

   export const findDuration = (text) => {
      if(!/\d/g.test(text))    return 0.0/12.0
      else {
         let hrs=0.0;
         let mins=0.0;
         if(text.toLowerCase().includes("hour")) {
            hrs =  text[text.indexOf("hour") - 2]
            let hrs_ = text[text.indexOf("hour") - 3]

            if(!/\d/g.test(hrs))    hrs = 0.0
            else {
               hrs = parseInt(hrs)
               if(/\d/g.test(hrs_))    hrs = hrs + parseInt(hrs_) * 10
            }
         }
         else if(text.toLowerCase().includes("hrs")) {
            hrs =  text[text.indexOf("hrs") - 2]
            let hrs_ = text[text.indexOf("hrs") - 3]
            if(!/\d/g.test(hrs)) hrs = 0.0
            else {
               hrs = parseInt(hrs)
               if(/\d/g.test(hrs_))    hrs = hrs + parseInt(hrs_) * 10
            }
         }
         if(text.toLowerCase().includes("min")) {
            mins =  text[text.indexOf("min") - 2]
            let mins_ = text[text.indexOf("min") - 3]
            if(!/\d/g.test(mins)) mins = 0.0
            else {
               mins = parseInt(mins)
               if(/\d/g.test(mins_))    mins = mins + parseInt(mins_) * 10
            }

            }
          return ((hrs) + (mins / 60.0))/12.0

         }
   }


   export const textDecorator = (text) => {
         if(text.toLowerCase().includes(" for ") )        return(text.slice(0, text.lastIndexOf(" for ")));
         else if(text.toLowerCase().includes(" in ") )    return(text.slice(0, text.lastIndexOf(" in ")));
         return (hrs + mins/60.0)/12.0
      
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
   return `${day} ${months[month]} ${year} `;
 }
export const getDay=()=>{
 var now = new Date();
 var start = new Date(now.getFullYear(), 0, 0);
 var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
 var day = Math.floor((diff) / (1000 * 60 * 60 * 24));
   return day;
}