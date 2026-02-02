import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {

    const [repositories, setRepositories] =  useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sugggestedRepositories, setSuggestedRepositories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=>{
        const userId = localStorage.getItem("userId");

        const fetchRepositories = async () => {
            try {
                const response = await fetch(`http://localhost:3002/repo/user/${userId}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch user repositories");
                }

                const data = await response.json();  
                setRepositories(data.repositories);
            } catch(err){
                console.error("Error while fetching repositories", err);
            }
        };

        const fetchSuggestedRepositories = async () => {
            try {
                const response = await fetch(`http://localhost:3002/repo/all`);

                if (!response.ok) {
                    throw new Error("Failed to fetch suggested repositories");
                }

                const data = await response.json();
                setSuggestedRepositories(data);
                
            } catch(err){
                console.error("Error while fetching repositories", err);
            }
        };

        fetchRepositories();
        fetchSuggestedRepositories();
    }, []);

    useEffect(() => {
        if(searchQuery == ""){
            setSearchResults(repositories);
        } else {
            const filterRepo = repositories.filter(
                (repo) => repo.name.toLowerCase().     includes(searchQuery.toLowerCase())
            );
            setSearchResults(filterRepo);
        }
    },[searchQuery, repositories]);

    return (
        <>
            <Navbar/>
            <section id="dashboard">
                <aside className="left-panel">
                    <h3>Suggested Repositories</h3>
                    {sugggestedRepositories.map((repo) => {
                        return(
                            <div key={repo._id}>
                                <h4>{repo.name}</h4>
                                <h4>{repo.description}</h4>
                            </div>
                        ); 
                    })}
                </aside>
                <main className="main-panel">
                    <h2>Your Repositories</h2>
                    <div id="search">
                        <input 
                            className="inp"
                            type="text" 
                            value={searchQuery}
                            placeholder="Search..."
                            onChange={(e)=>setSearchQuery(e.target.value)}
                        />
                    </div>
                    {searchResults.map((repo) => {
                        return (
                            <div key={repo._id}>
                                <h4>{repo.name}</h4>
                                <h4>{repo.description}</h4>
                            </div>
                        );
                    })}
                </main>
                <aside className="right-panel">
                    <h3>Upcomming Events</h3>
                    <ul>
                        <li>
                            <p>Tech Conference - Dec 15 </p>
                        </li>
                        <li>
                            <p>Developer Meetup - Dec 25</p>
                        </li>
                        <li>
                            <p>React Summit - Jan 5</p>
                        </li>
                    </ul>
                </aside>
            </section>
        </>
    );    
};

export default Dashboard;