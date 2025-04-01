import { useState, useEffect, FC } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { messageTemplateConfingGroupBy, typeMessage, User, Whatsapp } from '../../types';

type WhatsappFormProps = {
    templateType: typeMessage;
    selectedUsers: User[];
    formData:Whatsapp
    updateFormData: (data: { message: string }) => void;
    onPrevious: () => void;
    onNext: () => void;
    isLastForm: boolean;
};

export const WhatsappForm :FC<WhatsappFormProps>= ({ 
    templateType, 
  
    formData,
    updateFormData,
    onPrevious,
    onNext,
    isLastForm
}) => {
    const [message, setMessage] = useState(formData.message);
    const getDefaultContent = (type: typeMessage): Whatsapp=> {
        const templatesForType = messageTemplateConfingGroupBy[type] || [];
    
        
        const emailTemplateConfig = templatesForType.find(config => config.label === "WHATSAPP");
    
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
    }, [templateType])
    
    const handleMessageChange = (newMessage: string) => {
        setMessage(newMessage);
        updateFormData({ message: newMessage });
    };
    
    return (
        <Box sx={{color:'black'}}>
            <Typography variant="h6" gutterBottom>
                WhatsApp
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