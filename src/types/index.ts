import { groupBy } from "es-toolkit"

export interface User {
    id: string,
    name: string,
    email: string

}

export enum typeMessage {
    Invitacion = "Invitacion",
    Recordatario = "Recordatorio",
    Personalizado = "Personalizado"

}

export type MessageTemplate = SMS | Whatsapp| Email;
export interface TemplateMessageConfig {
    label:string,
    template: MessageTemplate,
    type: typeMessage
}

export const messageTemplateConfings: TemplateMessageConfig[] = [

    //Invitacion

    {
        label:"EMAIL",
        template: {
            subject: 'Invitación al proceso de [nombre del proceso]',
            message: `Estimado/a [Nombre],

                    Esperamos que te encuentres bien. A través de este medio, queremos invitarte a participar en el proceso de [nombre del proceso], que se llevará a cabo el [fecha] a las [hora]. El lugar del encuentro será [dirección/sala virtual].

                    Tu participación es muy importante para nosotros. Agradeceríamos que confirmes tu asistencia respondiendo a este correo.

                    Quedamos atentos a cualquier consulta que puedas tener.

                    Cordialmente,
                    [Nombre del remitente]
                    [Puesto]
                    [Empresa/Organización]`
        },
        type: typeMessage.Invitacion
    }, 
    
    {
        label:"SMS",
        template: {
            message: `Hola [Nombre], te invitamos a participar en el proceso de [nombre del proceso/actividad] que se llevará a cabo el [fecha] a las [hora]. Por favor, confirma tu asistencia respondiendo a este mensaje. ¡Te esperamos!`
        },
        type: typeMessage.Invitacion
    },
    {
        label:"WHATSAPP",
        template: {
            message: `Hola [Nombre], te invitamos a participar en el proceso de [nombre del proceso/actividad] que se llevará a cabo el [fecha] a las [hora]. Por favor, confirma tu asistencia respondiendo a este mensaje. ¡Te esperamos!`
        },
        type: typeMessage.Invitacion
    },
   

    // recordatorio
    {
        label:"EMAIL",
        template: {
            subject:  'Recordatorio del proceso de [nombre del proceso]',
            message: `Estimado/a [Nombre],
    
                        Queremos recordarte que el proceso de [nombre del proceso], al que amablemente confirmaste tu asistencia, se realizará el [fecha] a las [hora].
                        
                        El evento tendrá lugar en [dirección/sala virtual]. Si tienes alguna duda o necesitas asistencia previa, no dudes en contactarnos.
                        
                        Te esperamos puntual.
                        
                        Saludos cordiales,
                        [Nombre del remitente]
                        [Puesto]
                        [Empresa/Organización]`
        },
        type: typeMessage.Recordatario
    }, 
    
    {   

        label:"SMS",
        template: {
            message: `Hola [Nombre], te recordamos que el proceso de [nombre del proceso/actividad] al que confirmaste tu asistencia se realizará el [fecha] a las [hora]. ¡Te esperamos puntual!`
        },
        type: typeMessage.Recordatario
    },
    {
        label:"WHATSAPP",
        template: {
            message: `Hola [Nombre], te recordamos que el proceso de [nombre del proceso/actividad] al que confirmaste tu asistencia se realizará el [fecha] a las [hora]. ¡Te esperamos puntual!`
        },
        type: typeMessage.Recordatario
    },
    //personalizado
    {
        label:"EMAIL",
        template: {
            subject:  '',
            message: ''
        },
        type: typeMessage.Personalizado
    }, 
    
    {   

        label:"SMS",
        template: {
            message: ''
        },
        type: typeMessage.Personalizado
    },
    {
        label:"WHATSAPP",
        template: {
            message: ''
        },
        type: typeMessage.Personalizado
    }


]

export const messageTemplateConfingGroupBy=groupBy(messageTemplateConfings,(config)=>config.type)

export interface SMS {
    message: string
}

export interface Whatsapp {
    message: string
}

export interface Email {

    subject: string,
    message: string
}

// Shape of the central form state
export type FormDataShape = {
    sms: SMS;
    email: Email;
    whatsapp: Whatsapp;
};

// Keys for the channels
export type ChannelKey = keyof FormDataShape; // 'sms' | 'email' | 'whatsapp'