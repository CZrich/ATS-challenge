import { User } from "../types";
import { UserTable } from '../components/UserTable/UserTable'
import { FC, useState } from "react";
import { Button, Modal } from "@mui/material";
import { TemplateModal } from "../components/templates/SelectTemplate";

type RootLayoutProps = {
    users: User[]
};


export const Rootlayout: FC<RootLayoutProps> = ({ users }) => {

    const [open, setOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleUserSelection = (user: User, isSelected: boolean) => {
        if (isSelected) {
            setSelectedUsers(prev => [...prev, user]);
        } else {
            setSelectedUsers(prev => prev.filter(u => u.id !== user.id));
        }
    };
    return (

        <div> 
            <div>
            Usuarios seleccionados: {selectedUsers.length}
            </div>
            <UserTable users={users} selectedUsers={selectedUsers} onUserSelect={handleUserSelection}>


            </UserTable>

          
            {
                selectedUsers.length > 0 && <Button  variant="contained" onClick={handleOpen}>Abrir modal</Button>
            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <TemplateModal selectedUsers={selectedUsers} onCancel={handleClose}></TemplateModal>

            </Modal>


        </div>
    );
}