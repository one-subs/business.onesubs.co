import { useEffect, useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Graph from "./components/Graph";

function Users() {

    const auth = useContext(AuthContext);
    const { request } = useHttp();

    const [data, setData] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth());

    useEffect(() => {
        const getId = async () => {
            try {
                const response = await request(`/partner/history?month=${month+1}`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });
                if (response) setData(response.data);
            } catch (err) {}
        }
        
        if (!data) getId();
    }, [auth.token, data, month, request]);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const previousMonth = (number) => {
        const newDate = new Date();
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() - number);
        return newDate.getMonth();
    }

    return (
        <div className="description">
            <div className="page_width" style={{marginTop: "60px"}}>
                <div className="left">
                    <h2 style={{marginBottom: "20px"}}>Select month</h2>
                    <span
                        style={{borderBottom: (month === previousMonth(5)) ? "1px solid" : "none"}}
                        onClick={(e) => {
                            setMonth(previousMonth(5))
                            setData(null)
                            }}>
                        {monthNames[previousMonth(5)]}
                    </span>
                    <span
                        style={{borderBottom: (month === previousMonth(4)) ? "1px solid" : "none"}}
                        onClick={(e) => {
                            setMonth(previousMonth(4))
                            setData(null)
                            }}>
                        {monthNames[previousMonth(4)]}
                    </span>
                    <span
                        style={{borderBottom: (month === previousMonth(3)) ? "1px solid" : "none"}}
                        onClick={(e) => {
                            setMonth(previousMonth(3))
                            setData(null)
                            }}>
                        {monthNames[previousMonth(3)]}
                    </span>
                    <span
                        style={{borderBottom: (month === previousMonth(2)) ? "1px solid" : "none"}}
                        onClick={(e) => {
                            setMonth(previousMonth(2))
                            setData(null)
                            }}>
                        {monthNames[previousMonth(2)]}
                    </span>
                    <span
                        style={{borderBottom: (month === previousMonth(1)) ? "1px solid" : "none"}}
                        onClick={(e) => {
                            setMonth(previousMonth(1))
                            setData(null)
                            }}>
                        {monthNames[previousMonth(1)]}
                    </span>
                    <span
                        style={{borderBottom: (month === previousMonth(0)) ? "1px solid" : "none"}}
                        onClick={(e) => {
                            setMonth(previousMonth(0))
                            setData(null)
                            }}>
                        {monthNames[previousMonth(0)]}
                    </span>
                    <div className="details" style={{marginTop: "40px"}}>
                        <span>Total users:</span>
                        <span>{data ? data.length : 0}</span>
                    </div>
                    <div className="details">
                        <span>Total income:</span>
                        <span>${data ? data.reduce((sum, item) => sum + item.price, 0).toFixed(2) : 0}</span>
                    </div>
                    <p>Please be aware that our retention policy lasts for 6 months.</p>
                </div>
                <div className="right" style={{textAlign: "start"}}>
                    <h2 style={{marginTop: "30px", marginBottom: "30px"}}>Number of users for {monthNames[month]}</h2>
                    <Graph data={data} month={month}/>
                </div>
            </div>
        </div>
    );
}

export default Users;