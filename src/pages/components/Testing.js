import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useHttp from "../../hooks/http.hook";

function Testing() {
    
    const auth = useContext(AuthContext);
    const { request } = useHttp();

    const [code, setCode] = useState("Test Code");

    const getTestAccess = async () => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const response = await request("/partner/create-test-access", "POST", { timezone }, {
            authorization: `Bearer ${auth.token}`
        });
        if (response) {
            setCode(response.code);
            setTimeout(() => {
                setCode("Test Code")
            }, 30000);
        }
    }

    return (
        <div className="description" style={{ marginTop: "100px" }}>
            <div className="page_width">
                <div className="left">
                    <div className="inputs" style={{ marginTop: "110px" }}>
                        <h2 style={{ color: "#334155", fontFamily: "Arial, Helvetica, sans-serif", width: "100%", margin: "0px", textAlign: "center", cursor: "text" }}>{code}</h2>
                        <button style={{ marginTop: "20px" }} onClick={getTestAccess}>Create</button>
                        <p style={{ marginTop: "20px", textAlign: "center" }}>Press Create button to get test access code.</p>
                    </div>
                </div>
                <div className="right">
                    <h2>Testing</h2>
                    <p>Generate an access code and test in your platform. This codes are only for testing purpose, you can check the number of users and income. After activation of your account, you will not see the tested users in Users page.</p>
                </div>
            </div>
        </div>
    );
}

export default Testing;