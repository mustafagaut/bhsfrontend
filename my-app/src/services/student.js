import axios from "axios";

let url = "http://localhost:4000/api/v1/student/"

export const addStudent = async (data) => {
    try {
        return await axios.post(`${url}addstudent`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return err;
    }
}

export const getStudent = async (id) => {
    try {
        return await axios.get(`${url + id}`);
    } catch (error) {
        return error;
    }
}
export const getAllStudent = async (data) => {
    try {
        return await axios.get(`${url}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return err;
    }
}
export const editStudent =async (data,id) =>{
    try {
        return await axios.post(`${url}editstudent/${id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return err;
    }
}