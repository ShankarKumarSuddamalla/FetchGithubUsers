import React from "react";
import { useState,useEffect } from "react";

const url='https://api.github.com/users';
const Fetch=()=>{
    const [users,setUsers] = useState([])
    const [searchQuery,setSearchQuery]=useState('')
    const [filteredUsers,setFilteredUsers]=useState([])
    useEffect(()=>{
        const FetchData=async()=>{
            try{
            const data=await fetch(url)
            const Fetched=await data.json()
            setUsers(Fetched)
            }
            catch(error){
                console.log(error)
            }
        }
        FetchData()
    },[]);
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query === '') {
            setFilteredUsers([]);
        } else {
            const fetchUser = users.filter(user =>
                user.login.toLowerCase().startsWith(query.toLowerCase())
            );
            setFilteredUsers(fetchUser);
        }
    };
    
    return(
        <section>
           <h2>Github Users</h2>
           <input type="text" placeholder="Search for a user by name from the api url used" value={searchQuery} onChange={handleSearch} />
           <ul className="users">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <li key={user.id}>
              <h3>{user.login}</h3>
              <img src={user.avatar_url} alt={user.login} />
            </li>
          ))
        ) : (
          searchQuery && <p>No user found</p>
        )}
      </ul>
    </section>
  );
};
  export default Fetch;