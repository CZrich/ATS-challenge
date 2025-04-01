import { FC, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { User } from '../../types';
import { MessagingForms } from './MessagingForms';

type ChannelSelectionModalProps = {
    templateType: string;
    selectedUsers: User[];
    onBack: () => void;
    onCancel: () => void;
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color:'black'
};

export const ChannelSelectionModal :FC<ChannelSelectionModalProps> = ({ 
    templateType, 
    selectedUsers, 
    onBack, 
    onCancel 
}) => {
    const [channels, setChannels] = useState({
        sms: false,
        email: false,
        whatsapp: false
    });
    const [showForms, setShowForms] = useState(false);
    
    const handleChannelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChannels({
            ...channels,
            [event.target.name]: event.target.checked
        });
    };
    
    const handleNext = () => {
        if (channels.sms || channels.email || channels.whatsapp) {
            setShowForms(true);
        }
    };
    
    if (showForms) {
        return (
            <MessagingForms
                templateType={templateType}
                selectedUsers={selectedUsers}
                channels={channels}
                onBack={() => setShowForms(false)}
                onCancel={onCancel}
            />
        );
    }
    
    return (
        <Box sx={style}>
            <FormLabel component="legend">Selección de Canales</FormLabel>
            <FormGroup>
                <FormControlLabel 
                    control={
                        <Checkbox 
                            checked={channels.sms} 
                            onChange={handleChannelChange} 
                            name="sms" 
                        />
                    } 
                    label="SMS" 
                />
                <FormControlLabel 
                    control={
                        <Checkbox 
                            checked={channels.email} 
                            onChange={handleChannelChange} 
                            name="email" 
                        />
                    } 
                    label="Correo electrónico" 
                />
                <FormControlLabel 
                    control={
                        <Checkbox 
                            checked={channels.whatsapp} 
                            onChange={handleChannelChange} 
                            name="whatsapp" 
                        />
                    } 
                    label="WhatsApp" 
                />
            </FormGroup>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={onBack}>Atrás</Button>
                <Button 
                    onClick={handleNext} 
                    variant="contained"
                    disabled={!channels.sms && !channels.email && !channels.whatsapp}
                >
                    Siguiente
                </Button>
            </Box>
        </Box>
    );
};