
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { User } from '../../types';
import { FC} from 'react';
import { Checkbox } from '@mui/material';

type UserTableProps = {

    users: User[],
    selectedUsers: User[],
    onUserSelect: (user: User, isSelected: boolean) => void

}


export const UserTable: FC<UserTableProps> = ({ users ,selectedUsers,onUserSelect}) => {



    const isUserSelected = (userId: string) => {
        return selectedUsers.some(user => user.id === userId);
    };

    const handleCheckboxChange = (user: User, event: React.ChangeEvent<HTMLInputElement>) => {
        onUserSelect(user, event.target.checked);
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Select</TableCell>
                        <TableCell align="right">name</TableCell>
                        <TableCell align="right">Email</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell component="th" scope="row">
                                <Checkbox 
                                checked={isUserSelected(user.id)}
                                onChange={(e)=>handleCheckboxChange(user,e)}
                                ></Checkbox>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {user.name}
                            </TableCell>
                            <TableCell align="right">{user.email}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
