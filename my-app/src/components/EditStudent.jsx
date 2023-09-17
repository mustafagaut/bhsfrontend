import React, { useState,useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCheckbox, MDBCol, MDBInput, MDBBreadcrumb,MDBBreadcrumbItem,MDBListGroup, MDBListGroupItem, MDBRow, MDBTextArea, MDBTypography } from 'mdb-react-ui-kit';
import { editStudent, getStudent } from '../services/student';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify'
import { useParams } from 'react-router-dom';


export default function EditStudent() {
    const {id} =useParams();
    const navigate= useNavigate();
    const [attachmentRows, setAttachmentRows] = useState([0]); // Initial attachment
    const [student, setStudent] = useState({}); 
    const [isChecked, setIsChecked] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [loading , setloading ] = useState(true);

    const addAttachmentRow = (event) => {
        
        event.preventDefault(); 
      setAttachmentRows([...attachmentRows, attachmentRows.length]);
    };
    const removeAttachmentRow = (indexToRemove) => {
        const updatedRows = attachmentRows.filter((_, index) => index !== indexToRemove);
        setAttachmentRows(updatedRows);
      };
      const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    
        if (!isChecked) {
          // If the checkbox was unchecked, fill the WhatsApp number field
          setWhatsappNumber(mobileNumber);
        } else {
          // If the checkbox was checked, clear the WhatsApp number field
          setWhatsappNumber('');
        }
      };
    
      const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
        
        // If the checkbox is checked, update the WhatsApp number field
        if (isChecked) {
          setWhatsappNumber(event.target.value);
        }
      };
      const editStudentDetails=async (e)=>{
        e.preventDefault();
        let formdata= new FormData(e.target);
        let bank_details={};
        const allData = {};
        for (const pair of formdata.entries()) {
          const [key, value] = pair;
          allData[key] = value;
          if(key=="account_no" && value){
            bank_details["account_no"]=value;
           }if(key=="account_name" && value){
            bank_details["account_name"]=value;
          }if(key=="bank_name" && value){
            bank_details["bank_name"]=value;
          }
          if(key=="ifsc" && value){
            bank_details["ifsc"]=value;
          }

          }
          formdata.append("bank_account_details",JSON.stringify(bank_details));
          for (const pair of formdata.entries()) {
            const [key, value] = pair;
            allData[key] = value;
          }
          console.log(allData);

          let response = await editStudent(formdata,id);
          console.log(response.data);
          if(response.data.success==true){
            toast.success("student updated Successfully");
            navigate("/student");
          }else{
            toast.error(response.message)
          }
      }
      useEffect(() => {
        console.log(id,"here ===========>");
        getStudentDetails(id);
    
      }, [loading])
      const getStudentDetails = (id) => {
        getStudent(id).then(res => {
            setStudent(res.data.student);
            setloading(false);
        
        }).catch(err => console.log(err));
      }
  return (
   <>
    {loading &&(<div>
        Loading ...
    </div>)}
    {!loading &&( <div className="mx-auto mt-5 " style={{ maxWidth: '900px' }}>
           <form onSubmit={(e)=>editStudentDetails(e)}>
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='/'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/student">Student</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Edit Student</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
      <MDBRow>
      <MDBTypography className= " text-center" tag="h5" >Edit Student</MDBTypography>
        <MDBCol md="8" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3 text-center">
             Student Details
            </MDBCardHeader>
            <MDBCardBody>
           
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput label='First name' defaultValue={student.name?student.name:""} name ="name" type='text' />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label='surname' name="surname" type='text' defaultValue={student.surname?student.surname:""} />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                  <MDBCol sm="3">
                    <MDBInput label='Class' name="class" type='text' defaultValue={student.class?student.class:""} />
                  </MDBCol>
                  <MDBCol sm="3">
                    <MDBInput label='Section ' name="section" type='text' defaultValue={student.section?student.section:""} />
                  </MDBCol>
                  <MDBCol sm="3">
                    <MDBInput label='Scholar No.' name="scholar_no" type='text' defaultValue={student.scholar_no?student.scholar_no:""} />
                  </MDBCol>
                  <MDBCol sm="3">
                    <MDBInput label='Roll No.'name="roll_no" type='text' defaultValue={student.roll_no?student.roll_no:""} />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput label='Date Of Birth' name="date_of_birth" type='date' defaultValue={student.date_of_birth?student.date_of_birth:""} />
                  </MDBCol>
                  <MDBCol>
                  <MDBInput label='House Name' name="house" type='text' defaultValue={student.house?student.house:""} />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput label='Fathers Name' name="father_name" type='text' defaultValue={student.father_name?student.father_name:""}/>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label='Mothers Name' name="mother_name" type='text' defaultValue={student.mother_name?student.mother_name:""} />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput label='Student ITS No.' name="student_its_id" type='text' defaultValue={student.student_its_id?student.student_its_id:""} />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label="Father's ITS No." name="father_its_id" type='text' defaultValue={student.father_its_id?student.father_its_id:""} />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput label="Father's Occupation" name="father_occupation" defaultValue={student.father_occupation?student.father_occupation:""} type ='text' /> 
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label="Father's Monthly Income" name="father_monthly_income" defaultValue={student.father_monthly_income?student.father_monthly_income:""} type='text'  />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                  <MDBCol sm="6">
                    <MDBInput
                     label='Mobile NO'
                     name="mobile" 
                     type='text'
                     value={student.mobile}
                     onChange={handleMobileNumberChange} />
                  </MDBCol>
                  <MDBCol sm="5">
                    <MDBInput 
                    label='Whatsapp No' 
                    name="whatsapp_no" value={student.whatsapp_no}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    disabled={isChecked} 
                    type='text' />
                  </MDBCol>
                  <MDBCol sm="1">
                   <MDBCheckbox checked={isChecked} onChange={handleCheckboxChange}/>
                  </MDBCol>
                  
                </MDBRow>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput label="Aadhar No" name="aadhar_no" defaultValue={student.aadhar_no?student.aadhar_no:""} type='text'   />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label="SSSIM ID"name="sssim_id" defaultValue={student.sssim_id?student.sssim_id:""} type='text'  />
                  </MDBCol>
                </MDBRow>
                <MDBInput label='Address' name="address" type='text' defaultValue={student.address?student.address:""} className="mb-4" />
                <MDBRow className="mb-4">
                  <MDBCol sm="7">
                    <MDBInput label="Email" name="email" defaultValue={student.email?student.email:""} type='text' />
                  </MDBCol>
                  <MDBCol sm="5">
                    <MDBInput label="Family ID" name="family_id" defaultValue={student.family_id?student.family_id:""} type='text' />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput label="Class Teacher Name" name = "class_teacher_name" defaultValue={student.class_teacher_name?student.class_teacher_name:""} type='text' />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label="Dini Teacher Name" name="dini_teacher_name" defaultValue={student.dini_teacher_name?student.dini_teacher_name:""} type='text' />
                  </MDBCol>
                </MDBRow>
              
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4">
        <MDBCard className="mb-5">
                <MDBCardHeader className='text-center'>Bank details</MDBCardHeader>
                <MDBRow className="mb-4">

                <MDBInput type="text" name="account_name" label="Account Holder's Name" />
                </MDBRow>
                <MDBRow className="mb-4">

                <MDBInput type="text" name="account_no" label="Account No." />
                </MDBRow>
                <MDBRow className="mb-4">

                <MDBInput type="text" name="bank_name" label="Bank Name" />
                </MDBRow>
                <MDBRow className="mb-4">

                <MDBInput type="text" name="ifsc" label="IFSC Code"/>
                </MDBRow>
            </MDBCard>
            <MDBCard className="mb-4">
                <MDBCardHeader className='text-center'>Attachments</MDBCardHeader>
                <label>Student image</label>
                <MDBInput type="file" accept="image/*" name="image" />
                {attachmentRows.map((rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {/* Conditionally render the input based on the rowIndex */}
                    {rowIndex !== 0 && (
                        <>
                        <MDBInput type="file" accept="image/*" name={`file_${rowIndex}`} label={`Attachment ${rowIndex + 1}`} /><MDBBtn
                        outline
                    color="danger"
                        size="sm"
                        onClick={() => removeAttachmentRow(rowIndex)}
                        style={{ marginLeft: '10px',height:"50px" }}
                        className="small-button"
                        >
                       X
                    </MDBBtn>
                        </>
                        )}
                    </div>
                ))}
                <MDBBtn className='mt-4' onClick={(e)=>addAttachmentRow(e)}>Add Attachment Row</MDBBtn>
            </MDBCard>
        </MDBCol>
            <MDBBtn type='submit'>Add</MDBBtn>
      </MDBRow>
      </form>
    </div>)}
   </>
  );
}