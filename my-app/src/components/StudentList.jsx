import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {MDBBtn,MDBCard,MDBCardHeader,MDBIcon} from 'mdb-react-ui-kit';
import "../css/studentList.css"
import { getAllStudent } from '../services/student';


const columns = [

  { field: 'roll_no', headerName: 'Roll No',type:Number, width: 200 },
  { field: 'name', headerName: 'First Name', width: 200 },
  { field: 'surname', headerName: 'Surname', width: 200 },
  { field: 'class', headerName: 'Class', width: 200 },
  { field: 'section', headerName: 'Section', type: 'section', width: 200 },
];


const StudentList = () => {
    const navigate = useNavigate();
    const [student, setstudent] = useState([])
    useEffect(() => {
      getAllStudent().then(res=>{
        console.log(res);
        setstudent(res.data.students)
      }).catch(err=>{console.log(err)});
    }, [])
    
    
    const handleRowClick = (params) => {
        console.log(params);
        const id = params.id; // Assuming there's an ID field
        navigate(`/details/${id}`);
      };

      const addStudent=()=>{
        navigate(`/addStudent`);
      }
  return (
    <>
   <div className="top-right-container">
   <MDBBtn  outline flat onClick={addStudent} id="plusTI">
    <MDBIcon className="top-right-button font-weight-bold" icon="plus" /> Add Student
    </MDBBtn>
   </div>
    
    <div className ='col-10 m-4 p-5'>
    <MDBCard>
    <MDBCardHeader  className='text-center'><h3>Students List</h3></MDBCardHeader>

    <DataGrid
    rows={student.length?student:[]}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    disableSelectionOnClick
    components={{ Toolbar: GridToolbar }}
    onRowClick={handleRowClick}
    getRowId={(student)=>student._id}
    />
    </MDBCard>
  </div>
  </>

  )
}

export default StudentList