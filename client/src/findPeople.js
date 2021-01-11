import {  useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { FaArrowCircleUp } from "react-icons/fa";



export default function FindPeople() {
    console.log('Rendenring <Find Friends');
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [showScroll, setShowScroll] = useState(false);

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

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 100) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 100) {
            setShowScroll(false);
        }
    };
  
    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    
    window.addEventListener('scroll', checkScrollTop);
        
    return (
        <div className="findPeople">
            <h2>Find People</h2>
            <p>Checkout who just joined!</p>
            <p>Are you looking for someone in particular?</p>
            <input
                defaultValue=""
                className="searchInput"
                onChange={(e) => setQuery(e.target.value)}
            />
            <div>
                {users.map((users, idx) => (
                    <div key={idx} className="users">
                        <Link
                            to={"/user/" + users.id}
                            className="searchedUsers"
                        >
                            {!users.profile_pic && (
                                <img
                                    src="../default-img.png"
                                    alt={`${users.first_name} ${users.last_name}`}
                                    className="profile-img"
                                ></img>
                            )}
                            {users.profile_pic && (
                                <img
                                    src={users.profile_pic}
                                    alt={`${users.first_name} ${users.last_name}`}
                                    className="profile-img"
                                ></img>
                            )}
                            <p>
                                {users.first_name} {users.last_name}
                            </p>
                        </Link>
                    </div>
                ))}
                {!users.length && query && <p>Nothing found</p>}
            </div>
            <FaArrowCircleUp
                className="scrollTop"
                onClick={scrollTop}
                style={{ height: 40, display: showScroll ? "flex" : "none" }}
            />
        </div>
    );
}
