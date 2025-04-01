import { useState, useEffect, FC } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Email, User,messageTemplateConfingGroupBy,typeMessage } from '../../types';

type EmailFormProps = {
    templateType: typeMessage;
    selectedUsers: User[];
    formData: Email;
    updateFormData: (data: { subject: string; message: string }) => void;
    onPrevious: () => void;
    onNext: () => void;
    isLastForm: boolean;
};

  // Get default content based on template type
  

export const EmailForm :FC<EmailFormProps>= ({ 
    templateType, 
   
    formData,
    updateFormData,
    onPrevious,
    onNext,
    isLastForm
}) => {
    const [subject, setSubject] = useState(formData.subject);
    const [message, setMessage] = useState(formData.message);


 // Ajuste de getDefaultContent
const getDefaultContent = (type: typeMessage): Email => {
    const templatesForType = messageTemplateConfingGroupBy[type] || [];

    // Buscar el template de EMAIL dentro de la agrupación
    const emailTemplateConfig = templatesForType.find(config => config.label === "EMAIL");

    // Validar si se encontró el template y aplicar el type guard
    if (emailTemplateConfig && 'subject' in emailTemplateConfig.template) {
        return {
            subject: emailTemplateConfig.template.subject || '',
            message: emailTemplateConfig.template.message || ''
        };
    }

    // Valor por defecto si no encuentra el template
    return { subject: '', message: '' };
};
       
    

    useEffect(() => {
        const defaultContent = getDefaultContent(templateType);

        // Only set defaults if current values are empty
        if (!formData.subject && !formData.message) {
            setSubject(defaultContent.subject);
            setMessage(defaultContent.message);
            updateFormData(defaultContent);
        }
    }, [templateType, updateFormData,formData.message,formData.subject]); 
    
    const handleChange = (field: string, value: string) => {
        const newFormData = { ...formData };
        if (field === 'subject') {
            setSubject(value);
            newFormData.subject = value;
        } else if (field === 'message') {
            setMessage(value);
            newFormData.message = value;
        }
        updateFormData(newFormData);
    };
    
    
    return (
        <Box sx={{color:'black'}}>
            <Typography variant="h6" gutterBottom>
                Correo Electrónico
            </Typography>
            <TextField
                fullWidth
                label="Asunto"
                value={subject}
                name='subject'
                onChange={(e) => handleChange('subject', e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                multiline
                rows={8}
                label="Mensaje"
                name='message'
                value={message}
                onChange={(e) => handleChange('message', e.target.value)}
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