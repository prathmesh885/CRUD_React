import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Table = ({ }) => {
  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  }
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(initialValues);
  const [updateId, setUpdateId] = useState()

  const onChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value });
  }

  const onSubmit = () => {
    async function postData() {
      const dataToSend = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone
      }
      const res = await axios.post('http://localhost:5000/app/add', dataToSend);
      if (res.status === 200) {
        fetchData();
      }
    }

    postData()
  }

  const deleteData = async (id) => {
    const res = await axios.delete(`http://localhost:5000/app/delete/${id}`);
    if (res.status === 200) {
      fetchData()
    }
  }

  async function fetchData() {
    const res = await axios.get('http://localhost:5000/app/get');
    setData(res.data)
  }

  const updateData = async (record) => {
    setUpdateId(record._id)
    console.log(record)
    const updateData = {
      firstName: record.firsName,
      lastName: record.lastName,
      email: record.email,
      phone: record.phone
    };

    setUserData(updateData);
  }

  const onUpdate = async () => {
    async function update() {
      const dataToSend = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone
      }
      const res = await axios.put(`http://localhost:5000/app/update/${updateId}`, dataToSend);
      if (res.status === 200) {
        fetchData();
      }
    }

    update()
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <h3 className='text-center'>TO DO LIST</h3>
      <br></br>
      <div>

      </div><div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">FirstName</th>
              <th scope="col">LastName</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((v, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{v.firsName}</td>
                  <td>{v.lastName}</td>
                  <td>{v.email}</td>
                  <td>{v.phone}</td>
                  <td type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => updateData(v)}>Edit</td>
                  {/* <td onClick={() => deleteData(v._id)}>Delete</td> */}
                  <td type="button" className="btn btn-danger" onClick={() => deleteData(v._id)}>Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <!-- Button trigger modal --> */}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add Data
        </button>

        {/* Model */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">TO DO LIST</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              {/* form */}
              <form className="modal-form">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                  <input onChange={onChange} name="firstName" value={userData.firstName} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                  <input onChange={onChange} name="lastName" value={userData.lastName} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                  <input onChange={onChange} name="email" value={userData.email} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Contact</label>
                  <input onChange={onChange} name="phone" value={userData.phone} type="text" className="form-control" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button onClick={onSubmit} type="button" className="btn btn-primary">Submit</button>
                  {/* <button onClick={onUpdate} type="button" className="btn btn-primary">Update</button> */}
                </div>
              </form>
            </div>
          </div>
        </div>

      </div></>
  )
}

export default Table
