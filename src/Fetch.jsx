import React from "react";
import { useState,useEffect } from "react";

const url='https://api.github.com/users';
const Fetch=()=>{
    const [users,setUsers] = useState([])
    const [searchQuery,setSearchQuery]=useState('')
    const [filteredUser,setFilteredUser]=useState(null)
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
    const handleSearch=(e)=>{
        setSearchQuery(e.target.value);
        const FetchUser=users.find(user=>
            user.login.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredUser(FetchUser)
    }
    return(
        <section>
           <h2>Github Users</h2>
           <input type="text" placeholder="Search for a user by name from the api url used" value={searchQuery} onChange={handleSearch} />
           <ul className="users">
            {filteredUser ? (
          <li key={filteredUser.id}>
            <h3>{filteredUser.login}</h3>
            <img src={filteredUser.avatar_url} alt={filteredUser.login} />
            <a href={filteredUser.html_url} >Profile</a>
          </li>
        ) : (
            searchQuery && <p>No user found</p>
          )}
        </ul>
      </section>
    );
  };
  
  export default Fetch;