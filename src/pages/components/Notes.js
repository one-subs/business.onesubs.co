import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useHttp from "../../hooks/http.hook";

function Navigation() {
    
    const auth = useContext(AuthContext);
    const { request } = useHttp();

    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => { 
            try {
                const response = await request(`/partner/partner-data`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });
                if (response) setData(response);
            } catch (err) {}
        }
        
        if (!data) getData();
    }, [auth.token, data, request]);


    if (data && data.status === "active") {
        return (
            <div className="notes">
                <p>Your account status is active, updated in {data.status_update.split("T")[0]}.</p>
            </div>
        );
    } else if (data && data.status === "testing") {
        return (
            <div className="notes">
                <p>Your account is in testing mode, to activate it go to settings.</p>
            </div>
        );
    } else if (data && data.status === "banned") {
        return (
            <div className="notes">
                <p>Your account was banned, updated in {data.status_update.split("T")[0]}.</p>
            </div>
        );
    } else {
        return (
            <div className="notes">
                <p>Your account information is not reachable.</p>
            </div>
        );
    }
}

export default Navigation;