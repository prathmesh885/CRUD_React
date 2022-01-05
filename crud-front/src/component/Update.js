import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Update = () => {
  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
  }
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(initialValues);

  async function fetchData(){
    const res = await axios.get('http://localhost:5000/app/get');
    setData(res.data)
  }

  const updateData = async(id) => {
    const res = await axios.put(`http://localhost:5000/update/${id}`, );
    if(res.status === 200){
      fetchData();
    }
  }

  const onChange = (e) => {
    const {name, value}= e.target
    setUserData({...userData, [name]:value});
  }

  const onSubmit = () => {
    async function postData(){
      const dataToSend = {
        firstName: userData.firstName ,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone
      }
      const res = await axios.post('http://localhost:5000/app/add', dataToSend);
      if(res.status === 200){
        fetchData();
      }
    }

    postData()
  }


  return (
    <div>
      {/* Model */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
    <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      {/* form */}
    <form className="modal-form">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
          <input onChange={onChange} name="firstName" value={userData.firstName} type="text" className="form-control"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
          <input onChange={onChange} name="lastName" value={userData.lastName} type="text" className="form-control"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
          <input onChange={onChange} name="email" value={userData.email} type="text" className="form-control"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Contact</label>
          <input onChange={onChange} name="contact" value={userData.contact} type="text" className="form-control"/>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button onClick={onSubmit} type="button" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
    </div>
  )
}

export default Update
