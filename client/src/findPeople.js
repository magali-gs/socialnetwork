import {  useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    console.log('Rendenring <Find Friends');
    const [ first, setFirst ] = useState('Magali');
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);


    useEffect(() => {
        console.log(`Console log happening in useEffect`);

        //use this to contact the server
        axios.get(`/users.json`).then(({ data }) => {
            setUsers(data);
            console.log("data in find people", data);
        });
    }, [query]);

    return (
        <div>
            {users.map((users, idx) => (
                <div key={idx}>
                    <img src={users.profile_pic}></img>
                    <p>
                        {users.first_name} {users.last_name}
                    </p>
                </div>
            ))}
        </div>
    );

}
