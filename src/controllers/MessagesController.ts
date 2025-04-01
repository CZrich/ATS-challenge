import {postMessages} from '../services/MessagesServices'

export const sendNotificatios=(data:any)=>{
     postMessages(data);
}