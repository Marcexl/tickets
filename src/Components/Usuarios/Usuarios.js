import React from 'react'
import Table from 'react-bootstrap/Table'
import './usuarios.css'
var i = 0;
const UserProfile = (props) => {
  return (
    <div>
        <h1>Personal Information</h1>
        <Table responsive>
            <thead>
                <tr>
                    <th><strong>Nombre:</strong> </th>
                    <th><strong>Apellido:</strong> </th>
                    <th><strong>Email:</strong> </th>
                    <th><strong>Dni:</strong></th>
                    <th><strong>Evento:</strong></th>
                </tr>
            </thead>
            <tbody className="profile-list">
            {
                
                props.data.map (content =>(
                <tr>
                    <td>{content.nombre}</td>
                    <td>{content.apellido}</td>
                    <td>{content.email}</td>
                    <td>{content.dni}</td>
                    <td>{content.evento}</td>
                </tr>
                ))
            }
            </tbody>
        </Table>
    </div>
  );
}

export default UserProfile;