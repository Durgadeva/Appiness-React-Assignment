// React-Redux
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Lodash lib
import { get, isEmpty } from 'lodash-es';

// Material-UI lib
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

// Actions
import { fetchUserDetails, selectUserDetails } from '../slices/app-slices';

// Styles
import './dashboard-page.scss';

export const DashboardPage = () => {

    const dispatch = useDispatch();

    // State variables initialization
    const [tableData, setTableData] = useState([]);
    
    // Fetch data from redux store
    const userDetails = useSelector(selectUserDetails);

    useEffect(() => {
        dispatch(fetchUserDetails());
    }, [])

    useEffect(() => {
        if (userDetails) {
            setTableData(createData(userDetails));
        }
    }, [userDetails])

    const tableHeaders = ['ID', 'NAME', 'AGE', 'GENDER', 'EMAIL', 'PHONE NUMBER'];

    const createData = (data) => {
        return data.map((mapData) => {
            return {
                id: get(mapData, 'id', '-'),
                name: get(mapData, 'name', '-'),
                age: get(mapData, 'age', '-'),
                gender: get(mapData, 'gender', '-'),
                email: get(mapData, 'email', '-'),
                phoneNo: get(mapData, 'phoneNo', '-')
            };
        });
    };

    return (
        <div className="dashboard-container">
            <h1>User Details</h1>
            {isEmpty(tableData) && <div className="full-page-loader-section">
                <div className="loader" />
            </div>}
            <Table>
                <TableHead className="table-header">
                    <TableRow>
                        {tableHeaders.map((mapData) => {
                            return <TableCell key={mapData} align="center">{mapData}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map(({ id, name, age, gender, email, phoneNo }) => (
                        <TableRow key={id}>
                            <TableCell align="center">{id}</TableCell>
                            <TableCell align="center">{name}</TableCell>
                            <TableCell align="center">{age}</TableCell>
                            <TableCell align="center">{gender}</TableCell>
                            <TableCell align="center">{email}</TableCell>
                            <TableCell align="center">{phoneNo}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
      </Table>
    </div>)
};
