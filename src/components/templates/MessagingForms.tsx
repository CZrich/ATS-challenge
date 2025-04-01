import { useState, useEffect, FC } from 'react';
import { Box } from '@mui/material';
import { messageTemplateConfingGroupBy, typeMessage, User } from '../../types';
import { SmsForm } from '../canales/Sms';
import { EmailForm } from './../canales/Email';
import { WhatsappForm } from '../canales/Whatsapp';
import { FormDataShape, ChannelKey } from '../../types/index'

import { sendNotificatios } from '../../controllers/MessagesController';



type MessagingFormsProps = {
    templateType: typeMessage;
    selectedUsers: User[];
    channels: {
        sms: boolean;
        email: boolean;
        whatsapp: boolean;
    };
    onBack: () => void;
    onCancel: () => void;
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'black'
};


// Define the structure of the object we send to the backend
type DataToSend = {
    templateType: typeMessage;
    selectedUsers: string[];
    channels: {
        [K in ChannelKey]?: FormDataShape[K];
        // This is equivalent to:
        // sms?: SmsData;
        // email?: EmailData;
        // whatsapp?: WhatsappData;
    };
};
export const MessagingForms: FC<MessagingFormsProps> = ({
    templateType,
    selectedUsers,
    channels,
    onBack,
    onCancel
}) => {
    const [formData, setFormData] = useState<FormDataShape>({
        sms: {
            message: ''
        },
        email: {
            subject: '',
            message: ''
        },
        whatsapp: {
            message: ''
        }
    });
    useEffect(() => {
        const newFormData: FormDataShape = {
            sms: { message: '' },
            email: { subject: '', message: '' },
            whatsapp: { message: '' }
        };
    
        if (channels.sms) {
            const smsTemplates = messageTemplateConfingGroupBy[templateType];
            const smsConfig = smsTemplates?.find(config => config.label === "SMS");
            newFormData.sms.message = smsConfig?.template?.message || '';
        }
    
        if (channels.email) {
            const emailTemplates = messageTemplateConfingGroupBy[templateType];
            const emailConfig = emailTemplates?.find(config => config.label === "EMAIL");
    
            // Type Guard: Validar que el template tiene subject y message
            if (emailConfig?.template && 'subject' in emailConfig.template) {
                newFormData.email.subject = emailConfig.template.subject;
                newFormData.email.message = emailConfig.template.message;
            }
        }
    
        if (channels.whatsapp) {
            const whatsappTemplates = messageTemplateConfingGroupBy[templateType];
            const whatsappConfig = whatsappTemplates?.find(config => config.label === "WHATSAPP");
            newFormData.whatsapp.message = whatsappConfig?.template?.message || '';
        }
    
        setFormData(newFormData);
    }, [templateType, channels]);
    
    const [enabledChannels, setEnabledChannels] = useState<ChannelKey[]>([]);
    // Índice del canal actual en la lista de canales habilitados
    const [currentChannelIndex, setCurrentChannelIndex] = useState(0);

    // Actualizar la lista de canales habilitados cuando cambien las selecciones
    useEffect(() => {
        const orderedChannels: ChannelKey[] = [];
        if (channels.sms) orderedChannels.push('sms');
        if (channels.email) orderedChannels.push('email');
        if (channels.whatsapp) orderedChannels.push('whatsapp');
        setEnabledChannels(orderedChannels);
    }, [channels]);

    // Obtener el canal actual
    const currentChannel = enabledChannels[currentChannelIndex];

    // Manejar navegación hacia atrás
    const handlePrevious = () => {
        if (currentChannelIndex > 0) {
            setCurrentChannelIndex(currentChannelIndex - 1);
        } else {
            onBack();
        }
    };

    // Manejar navegación hacia adelante o envío
    const handleNext = () => {
        if (currentChannelIndex < enabledChannels.length - 1) {
            setCurrentChannelIndex(currentChannelIndex + 1);
        } else {
            // Preparar datos para enviar al backend
            const dataToSend: DataToSend = {
                templateType,
                selectedUsers: selectedUsers.map(user => user.email),
                channels: {}
            };

            // Añadir solo los canales seleccionados con sus datos (Corrected Loop)
            enabledChannels.forEach(channel => {
                // Use conditional checks for type safety
                if (channel === 'sms') {
                    dataToSend.channels.sms = formData.sms;

                } else if (channel === 'email') {
                    dataToSend.channels.email = formData.email;

                } else if (channel === 'whatsapp') {
                    dataToSend.channels.whatsapp = formData.whatsapp;

                }
            });

            // Imprimir en consola

            sendNotificatios(dataToSend);

            // Cerrar el modal
            onCancel();
        }
    };

    // Actualizar los datos del formulario (Corrected Version)
    const updateFormData = <K extends ChannelKey>(channel: K, data: FormDataShape[K]) => {
        setFormData(prev => ({
            ...prev,
            [channel]: data // This assignment is now type-safe within the state update
        }));
    };

    // Determinar si es el último canal
    const isLastChannel = currentChannelIndex === enabledChannels.length - 1;

    return (
        <Box sx={style}>
            {currentChannel === 'sms' && (
                <SmsForm
                    templateType={templateType}
                    selectedUsers={selectedUsers}
                    formData={formData.sms}
                    updateFormData={(data) => updateFormData('sms', data)}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    isLastForm={isLastChannel}
                />
            )}
            {currentChannel === 'email' && (
                <EmailForm
                    templateType={templateType}
                    selectedUsers={selectedUsers}
                    formData={formData.email}
                    updateFormData={(data) => updateFormData('email', data)}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    isLastForm={isLastChannel}
                />
            )}
            {currentChannel === 'whatsapp' && (
                <WhatsappForm
                    templateType={templateType}
                    selectedUsers={selectedUsers}
                    formData={formData.whatsapp}
                    updateFormData={(data) => updateFormData('whatsapp', data)}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    isLastForm={isLastChannel}
                />
            )}
        </Box>
    );
};