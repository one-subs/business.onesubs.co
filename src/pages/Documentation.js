import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';

import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

import { ReactComponent as Choice } from '../styles/images/choice.svg';
import { ReactComponent as Activate } from '../styles/images/activate.svg';
import { ReactComponent as Logo } from '../styles/images/logo_blue.svg';

import blue from '../styles/images/onesubs-logo-blue.png';
import white from '../styles/images/onesubs-logo-white.png';

import Testing from './components/Testing';

SyntaxHighlighter.registerLanguage('javascript', js);

const example = `/** positive response */
{ status: true, message: "User approved!" }
{ status: true, message: "Test user approved!" }

/** negative response */
{ status: false, message: "Invalid serviceId!" }
{ status: false, message: "Access code expired!" }
{ status: false, message: "User doesn't have enough tier!" }
{ status: false, message: "User doesn't have subscription!" }
{ status: false, message: "User's daily access limit has reached!" }
{ status: false, message: "User's account has been banned!" }
{ status: false, message: "Abnormal action indicated!" }
{ status: false, message: "Something went wrong, please try againg!" }`;

function Overview() {
    
    const auth = useContext(AuthContext);
    const { request } = useHttp();

    const [id, setId] = useState("");

    useEffect(() => {
        const getId = async () => { 
            try {
                const response = await request("/partner/id", "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });
                if (response) setId(response.id);
                else setId("Error to catch your ID");
            } catch (err) {
                console.log(err.message);
            }
        }
        
        if (id === "") getId();
    }, [id, auth, request]);

const data = `const url = "${process.env.REACT_APP_SERVER}/partner/validation";
const method = "POST";
const body = { serviceId: "${id}", code: "5T423R" };`;

    return (
        <>
            <div className="description" style={{ marginTop: "60px" }}>
                <div className="page_width">
                    <div className="left">
                        <h2 style={{ marginTop: "30px" }}>Hi there, let's get started! 🚀</h2>
                        <p>To get start the integration, we recomend you to read the short explanation of our <Link style={{ color: "#94a3b8" }} to={`${process.env.REACT_APP_ONESUBS}/business`}><u style={{cursor:"pointer"}}>business</u></Link>. If you already know how it works, you can continue here.</p>
                        <p>This is the API to access your premium service. To use this API, you will need your service ID and access code, which can be obtained from your user (e.g., "5T423R").</p>
                        <p>The API will verify if the user has an active subscription.</p>
                        <p>If the user has a subscription, the API will return a status of true. Otherwise, it will return a status of false.</p>
                    </div>
                    <div className="right" style={{textAlign: "start"}}>
                        <p style={{ marginTop: '0px' }}>Your serivce id: (Do not share!)</p>
                        <SyntaxHighlighter language="javascript" style={atomOneDark} showLineNumbers>{`serviceId: ${id}`}</SyntaxHighlighter>
                        <p>API url, method and body to approve user:</p>
                        <SyntaxHighlighter language="javascript" style={atomOneDark} showLineNumbers>{data}</SyntaxHighlighter>
                        <p>Example API response:</p>
                        <SyntaxHighlighter language="javascript" style={atomOneDark} showLineNumbers>{example}</SyntaxHighlighter>
                    </div>
                </div>
            </div>
            <div className="description" style={{ marginTop: "100px" }}>
                <div className="page_width">
                    <div className="left">
                        <div className="inputs">
                            <Link to={process.env.REACT_APP_ONESUBS}><Logo style={{ maxWidth: '140px', maxHeight: '50px' }}/></Link>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10b981" className="bi bi-check-lg" viewBox="0 0 16 9" style={{ marginRight: '10px' }}>
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                </svg>
                                OneSubs M tier</p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10b981" className="bi bi-check-lg" viewBox="0 0 16 9" style={{ marginRight: '10px' }}>
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                </svg>
                                Access for 24 hours</p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10b981" className="bi bi-check-lg" viewBox="0 0 16 9" style={{ marginRight: '10px' }}>
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                </svg>
                                Unlimited Content Access</p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10b981" className="bi bi-check-lg" viewBox="0 0 16 9" style={{ marginRight: '10px' }}>
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                </svg>
                                Ad-Free Experience</p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10b981" className="bi bi-check-lg" viewBox="0 0 16 9" style={{ marginRight: '10px' }}>
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                </svg>
                                Priority Customer Support</p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10b981" className="bi bi-check-lg" viewBox="0 0 16 9" style={{ marginRight: '10px' }}>
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                </svg>
                                Multiple Device Streaming</p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10b981" className="bi bi-check-lg" viewBox="0 0 16 9" style={{ marginRight: '10px' }}>
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                </svg>
                                Exclusive Early Access</p>
                            <p style={{ marginBottom: "30px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10b981" className="bi bi-check-lg" viewBox="0 0 16 9" style={{ marginRight: '10px' }}>
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                </svg>
                                Customizable Profiles</p>
                            <input type="text" placeholder="Code"/>
                            <button>Start</button>
                        </div>
                    </div>
                    <div className="right" style={{textAlign: "start"}}>
                        <h2 style={{ marginTop: "0px" }}>Basic implementation</h2>
                        <p>Create an access form with input type text, and submit button. Show your service tier (e.g. OneSubs M tier).</p>
                        <p>Add validation API for this form. When user submits access code, API will check and send the status.</p>
                        <p>If the status is true, you will give an access for 24 hours.</p>
                        <p style={{ color: "#334155", fontWeight: "bold" }}>Please note that you need to add the OneSubs logo with a link to our website.</p>
                        <p style={{ color: "#334155" }}>Click <a href={blue} download="onesubs-logo-blue.png" style={{ color: "#334155" }}>Blue</a> or <a href={white} download="onesubs-logo-white.png" style={{ color: "#334155" }}>White</a> to download PNG logo.</p>
                    </div>
                </div>
            </div>
            <div className="description" style={{ marginTop: "100px" }}>
                <div className="page_width">
                    <div className="left">
                        <h2>Flexibility</h2>
                        <p>You can integrate access UI style as you want. Add what features user will get with OneSubs access. The main part, you have to use the API above and follow the OneSubs logo rule.</p>
                    </div>
                    <div className="right">
                        <Choice style={{ marginTop: '50px', maxWidth: '350px', maxHeight: '310px' }}/>
                    </div>
                </div>
            </div>
            <Testing/>
            <div className="description" style={{ marginTop: '100px' }}>
                <div className="page_width">
                    <div className="left">
                        <h2 style={{ marginTop: '0px' }}>Your service price</h2>
                        <p>In the page settings, you can set how much you charge for your service per user each day.</p>
                        <p style={{ color: "#334155" }}>For example, if you have a "Premium" subscription that normally costs $19 per month:</p>
                        <p style={{ color: "#334155" }}>1. Remove the transaction fee, which is ~5%. This reduces the monthly price to $18.05.</p>
                        <p style={{ color: "#334155" }}>2. Then, divide this by the number of days in a month (that is 30), to find the daily price per user.</p>
                        <p style={{ color: "#334155" }}>This calculation shows that your service price per user per day is $0.6.</p>
                        <p style={{ color: "#334155" }}>So, for each user from OneSubs that uses your service, you will earn $0.6 per day.</p>
                        <p style={{ color: "#334155", fontWeight: "bold" }}>We ask you to make the cost of the service as close as possible to the real price.</p>
                        <p><b>Minimum service price is $0.04 and Maximum is $3.33.</b></p>
                    </div>
                    <div className="right">
                        <h2 style={{ marginTop: '0px' }}>How to Earn More and Get More Users?</h2>
                        <p>After setting your service price, you can see which service tier it falls into (e.g., S, M, L, XL, or XXL, where S is the cheapest and XXL is the most expensive).</p>
                        <p>- OneSubs Elite Subscribers can access expensive (XXL or XL) services or multiple smaller (L, M, or S) services.</p>
                        <p>- OneSubs Premium Subscribers can access large (L) services and multiple smaller (M or S) services, but not any of expensive (XL or XXL) tiers.</p>
                        <p><b>To attract more subscribers and increase your earnings, we suggest offering a smaller tier service. This way, more users are likely to try and pay for your service.</b></p>
                        <p>The minimum prices for each tier are S: $0.04, M: $0.26, L: $0.51, XL: $1.01, and XXL: $2.01.</p>
                    </div>
                </div>
            </div>
            <div className="description" style={{ marginTop: '100px' }}>
                <div className="page_width">
                    <div className="left">
                        <Activate style={{ marginTop: '50px', maxWidth: '350px', maxHeight: '310px' }}/>
                    </div>
                    <div className="right">
                        <h2>Activation</h2>
                        <p>If you finished an implementation and testing, go to the settings and check your service information. After ensuring the service information, you can start activation. Note that you will accept the Business Account Rules and Policy when you activate.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Overview;