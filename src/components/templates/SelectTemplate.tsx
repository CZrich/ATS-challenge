import { useState } from 'react';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { User } from '../../types';
import { ChannelSelectionModal } from './SelectChannel';

type TemplateModalProps = {
    onCancel: () => void;
    selectedUsers: User[];
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

export const TemplateModal = ({ onCancel, selectedUsers }: TemplateModalProps) => {
    const [templateType, setTemplateType] = useState('Invitacion');
    const [showChannelModal, setShowChannelModal] = useState(false);
    
    const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTemplateType(event.target.value);
    };
    
    const handleNext = () => {
        setShowChannelModal(true);
    };
    
    if (showChannelModal) {
        return (
            <ChannelSelectionModal 
                templateType={templateType}
                selectedUsers={selectedUsers}
                onBack={() => setShowChannelModal(false)}
                onCancel={onCancel}
            />
        );
    }
    
    return (
        <Box sx={style}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Selección de Plantilla</FormLabel>
                <RadioGroup
                    aria-label="template"
                    name="template-radio-group"
                    value={templateType}
                    onChange={handleTemplateChange}
                >
                    <FormControlLabel  value="Invitacion" control={<Radio />} label="Invitación" />
                    <FormControlLabel  value="Recordatorio" control={<Radio />} label="Recordatorio" />
                    <FormControlLabel   value="Personalizado" control={<Radio />} label="Personalizado" />
                </RadioGroup>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={onCancel}>Cancelar</Button>
                <Button onClick={handleNext} variant="contained">Siguiente</Button>
            </Box>
        </Box>
    );
};