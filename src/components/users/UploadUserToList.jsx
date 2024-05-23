import React, { useEffect, useState } from 'react';
import { useGetUser } from '../../hooks';

const UploadUserToList = ({onData}) => {

  const { getUsers, loading, data, error } = useGetUser();

  useEffect(() => {
    getUsers();
  }, []); 

  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const addUser = () => {
    if (selectedUserId) {
      const user = data.find(user => user.id === selectedUserId);

      if (user && !selectedUsers.includes(user)) {
        setSelectedUsers([...selectedUsers, user]);
      }
    onData(user)

    }
  };

  return (
    <div className='userSelector'>

      <div>
        <select
          value={selectedUserId}
          onChange={e => setSelectedUserId(e.target.value)}
        >
          <option value="" disabled>Select a user</option>
          {data?.map(user => (
            <option key={user.id} value={user.id}>{user.email}</option>
          ))}
        </select>
        <button className="" onClick={addUser}>Add User</button>
      </div>
      <ul>
        {selectedUsers.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UploadUserToList;