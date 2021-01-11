import {  useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";


export default function FindPeople() {
    console.log('Rendenring <Find Friends');
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log(`Console log happening in useEffect`);
        let abort;
        
        (async () => {
            if (!query) {
                const { data } = await axios.get("/latest-users");
                if (!abort) {
                    setUsers(data);
                    console.log("data in find people", data);
                }
            } else {
                const { data } = await axios.get("/find-users/" + query);
                if (!abort) {
                    setUsers(data);
                    console.log("data in find people", data);
                }
            }
        })();

        return () => {
            console.log(`About to replace ${query} with`);
            abort = true;
        };
    }, [query]);

    return (
        <div>
            <h2>Find People</h2>
            <p>Checkout who just joined!</p>
            <p>Are you looking for someone in particular?</p>
            <input
                defaultValue="teste"
                onChange={(e) => setQuery(e.target.value)}
            />
            <div>
                {users.map((users, idx) => (
                    <div key={idx}>
                        <Link to={"/user/" + users.id}>
                            {!users.profile_pic && (
                                <img
                                    src="../default-img.png"
                                    alt={`${users.first_name} ${users.last_name}`}
                                ></img>
                            )}
                            {users.profile_pic && (
                                <img
                                    src={users.profile_pic}
                                    alt={`${users.first_name} ${users.last_name}`}
                                ></img>
                            )}
                            <p>
                                {users.first_name} {users.last_name}
                            </p>
                        </Link>
                    </div>
                ))}
                {!users.length && query && <li>Nothing found</li>}
            </div>
        </div>
    );

}
