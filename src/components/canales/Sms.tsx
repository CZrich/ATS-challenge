import { useState, useEffect, FC } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { messageTemplateConfingGroupBy, SMS, typeMessage, User } from '../../types';

type SmsFormProps = {
    templateType: typeMessage;
    selectedUsers: User[];
    formData: SMS
    updateFormData: (data: { message: string }) => void;
    onPrevious: () => void;
    onNext: () => void;
    isLastForm: boolean;
};

export const SmsForm :FC<SmsFormProps>= ({ 
    templateType, 
  
    formData,
    updateFormData,
    onPrevious,
    onNext,
    isLastForm
}) => {
    const [message, setMessage] = useState(formData.message);
     // Ajuste de getDefaultContent
const getDefaultContent = (type: typeMessage): SMS=> {
    const templatesForType = messageTemplateConfingGroupBy[type] || [];

    
    const emailTemplateConfig = templatesForType.find(config => config.label === "SMS");

    // Validar si se encontró el template y aplicar el type guard
    if (emailTemplateConfig && 'message' in emailTemplateConfig.template) {
        return {
            
            message: emailTemplateConfig.template.message || ''
        };
    }

    // Valor por defecto si no encuentra el template
    return { message: '' };
};
  
useEffect(() => {
    const defaultContent = getDefaultContent(templateType);

    // Only set defaults if current values are empty
    if ( !formData.message) {
       
        setMessage(defaultContent.message);
        updateFormData(defaultContent);
    }
}, [templateType, updateFormData, formData.message]); 
   
    
    // Actualizar el formData cuando cambia el mensaje
    const handleMessageChange = (newMessage: string) => {
        setMessage(newMessage);
        updateFormData({ message: newMessage });
    };
    
    return (
        <Box sx={{color:'black'}}>
            <Typography variant="h6" gutterBottom>
                SMS
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                label="Mensaje"
                name='message'
                value={message}
                onChange={(e) => handleMessageChange(e.target.value)}
                margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={onPrevious}>Atrás</Button>
                <Button 
                    onClick={onNext} 
                    variant="contained"
                >
                    {isLastForm ? 'Enviar' : 'Siguiente'}
                </Button>
            </Box>
        </Box>
    );
};