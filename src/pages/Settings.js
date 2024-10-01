import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Alert from "./components/Alert.js";

function Settings() {

  const auth = useContext(AuthContext);
  const { request, error, clearError } = useHttp();

  const [logo, setLogo] = useState("-none-");
  
  const [tier, setTier] = useState("-none-");
  const [name, setName] = useState("-none-");
  const [website, setWebsite] = useState("-none-");
  const [description, setDescription] = useState("-none-");
  const [keywords, setKeywords] = useState("-none-");
  const [message, setMessage] = useState(false);
  
  const [price, setPrice] = useState("-none-");
  
  const [bankName, setBankName] = useState("-none-");
  const [bankNumber, setBankNumber] = useState("-none-");
  const [bankSwift, setBankSwift] = useState("-none-");
  
  const [companyName, setCompanyName] = useState("-none-");
  const [companyNumber, setCompanyNumber] = useState("-none-");
  const [companyTax, setCompanyTax] = useState("-none-");
  const [companyCountry, setCompanyCountry] = useState("-none-");
  const [companyCity, setCompanyCity] = useState("-none-");
  const [companyZipCode, setCompanyZipCode] = useState("-none-");
  const [companyAddress1, setCompanyAddress1] = useState("-none-");
  const [companyAddress2, setCompanyAddress2] = useState("-none-");
  const [companyPhone, setCompanyPhone] = useState("-none-");
  
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => { 
        try {
            const response = await request(`/partner/partner-data`, "GET", null, {
                authorization: `Bearer ${auth.token}`
            });
            if (response) {
              setName(response.name || "");
              setWebsite(response.website || "");
              setDescription(response.description || "");
              setKeywords(response.keywords || "");
              setLogo(response.logo || "");
              setPrice(response.price || "");
              setTier(response.tier || "");
              setBankName(response.bankName || "");
              setBankNumber(response.bankNumber || "");
              setBankSwift(response.bankSwift || "");
              setCompanyName(response.companyName || "");
              setCompanyNumber(response.companyNumber || "");
              setCompanyTax(response.companyTax || "");
              setCompanyCountry(response.companyCountry || "");
              setCompanyCity(response.companyCity || "");
              setCompanyZipCode(response.companyZipCode || "");
              setCompanyAddress1(response.companyAddress1 || "");
              setCompanyAddress2(response.companyAddress2 || "");
              setCompanyPhone(response.companyPhone || "");
            }
        } catch (err) {}
    }
    
    if (name === "-none-") getData();
  }, [auth.token, name, request]);

  const update = async () => {
    const keywordList = (typeof keywords === 'object') ? keywords : keywords.split(', ')
    const response = await request(`/partner/partner-data`, "PUT", {
      name, website, description, keywords: keywordList, logo, price, bankName, bankNumber, bankSwift
    }, {
        authorization: `Bearer ${auth.token}`
    });
    if (response) {
      setMessage(true);
      window.scrollTo(0, 0);
      navigate(0);
    }
  }

  const setCompanyInfo = async () => {
    const response = await request(`/partner/company-data`, "PUT", { 
      companyName, companyNumber, companyTax, companyCountry, companyCity,
      companyZipCode, companyAddress1, companyAddress2, companyPhone
    }, {
        authorization: `Bearer ${auth.token}`
    });
    if (response) {
      setMessage(true);
      window.scrollTo(0, 0);
      navigate(0);
    }
  }

  const activate = async () => {
    const response = await request(`/partner/status`, "POST", { status }, {
        authorization: `Bearer ${auth.token}`
    });
    if (response) {
      setMessage(true);
      window.scrollTo(0, 0);
      navigate(0);
    }
  }

  return (
    <div className="window" style={{ marginTop: "60px" }}>
      <div className="page_width">
        <div className="left">
          <div className="back" style={{background: "none"}}>
            {error ? <Alert message={error} type={"error"} clearError={clearError}/> : ""}
            {message ? <Alert message={"Successfully updated!"} type={"success"} clearError={() => setMessage(false)}/> : ""}
            
            <div className="form" style={{boxShadow: "none", marginTop: "60px"}}>
              <h1>Service logo</h1>
              <div className="input-container">
                <input type="text" name="logo" value={logo} onChange={(e) => setLogo(e.target.value)}/>
                <label htmlFor="input">Link to your logo</label>
              </div>
              <p style={{ width: "100%" }}>Add the url to your service logo to recognize your tool in our service page.</p>
              <button style={{marginTop: "5px", marginBottom: "10px"}} onClick={() => update()}>Update</button>
            </div>

            <div className="form" style={{boxShadow: "none", marginTop: "30px"}}>
              <h1>Service price { tier && tier !== '-none-' ? `(${tier})` : "" }</h1>
              <div className="input-container">
                <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                <label htmlFor="input">Price per user per day in USD*</label>
              </div>
              <p style={{ width: "100%" }}>Add the service price in USD per user per day, you will earn this amount for each user a day.</p>
              <button style={{marginTop: "5px", marginBottom: "10px"}} onClick={() => update()}>Update</button>
            </div>

            <div className="form" style={{boxShadow: "none", marginTop: "30px"}}>
              <h1>Service info</h1>
              <div className="input-container">
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="input">Name*</label>
              </div>
              <div className="input-container">
                <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                <label htmlFor="input">Website*</label>
              </div>
              <div className="input-container">
                <input type="text" name="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)}/>
                <label htmlFor="input">Enter keywords using commas*</label>
              </div>
              <div className="textarea-container">
                  <textarea id="textarea" value={description}  onChange={(e) => setDescription(e.target.value)}/>
                  <label htmlFor="textarea">Describe your service*</label>
              </div>
              <p style={{ width: "100%" }}>Please ensure your information is accurate and up to date. This helps us provide you with the best service possible.</p>
              <button style={{marginTop: "5px", marginBottom: "10px"}} onClick={() => update()}>Update</button>
            </div>

            <div className="form" style={{boxShadow: "none", marginTop: "30px"}}>
              <h1>Company info</h1>
              <div className="input-container">
                <input type="text" name="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                <label htmlFor="input">Legal business name*</label>
              </div>
              <div className="input-container">
                <input type="text" name="registration-number" value={companyNumber} onChange={(e) => setCompanyNumber(e.target.value)}/>
                <label htmlFor="input">Registration number*</label>
              </div>
              <div className="input-container">
                <input type="text" name="tax-number" value={companyTax} onChange={(e) => setCompanyTax(e.target.value)}/>
                <label htmlFor="input">Tax identification number*</label>
              </div>
              <p style={{ marginBottom: "40px", marginTop: "50px", fontWeight: "bold" }}>Company address information.</p>
              <div className="input-container">
                <input type="text" name="bank-country" value={companyCountry} onChange={(e) => setCompanyCountry(e.target.value)}/>
                <label htmlFor="input">Company located country*</label>
              </div>
              <div className="input-container">
                <input type="text" name="company-country" value={companyCity} onChange={(e) => setCompanyCity(e.target.value)}/>
                <label htmlFor="input">City or province*</label>
              </div>
              <div className="input-container">
                <input type="text" name="company-zip-code" value={companyZipCode} onChange={(e) => setCompanyZipCode(e.target.value)}/>
                <label htmlFor="input">Zip code*</label>
              </div>
              <div className="input-container">
                <input type="text" name="company-address-2" value={companyAddress1} onChange={(e) => setCompanyAddress1(e.target.value)}/>
                <label htmlFor="input">Address line 1*</label>
              </div>
              <div className="input-container">
                <input type="text" name="company-address-2" value={companyAddress2} onChange={(e) => setCompanyAddress2(e.target.value)}/>
                <label htmlFor="input">Address line 2</label>
              </div>
              <p style={{ marginBottom: "40px", marginTop: "50px", fontWeight: "bold" }}>Company contact information.</p>
              <div className="input-container">
                <input type="text" name="phone-number" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)}/>
                <label htmlFor="input">Business phone number*</label>
              </div>
              <p style={{ fontWeight: "bold", width: "100%" }}>Double check your company information before saving. To update company info after first activation of your service, you will need to send the request email to OneSubs for Business email address. Make sure that your bank located country will be the same as your company address country.</p>
              <button style={{ marginTop: "5px", marginBottom: "10px" }} onClick={() => setCompanyInfo()}>Save</button>
            </div>

            <div className="form" style={{boxShadow: "none", marginTop: "30px"}}>
              <h1>Bank info</h1>
              <p style={{ marginBottom: "40px", fontWeight: "bold" }}>Country: { companyCountry.length > 0 ? companyCountry : '-' }</p>
              <div className="input-container">
                <input type="text" name="bank-name" value={bankName} onChange={(e) => setBankName(e.target.value)}/>
                <label htmlFor="input">Bank name*</label>
              </div>
              <div className="input-container">
                <input type="text" name="swift" value={bankSwift} onChange={(e) => setBankSwift(e.target.value)}/>
                <label htmlFor="input">Swift*</label>
              </div>
              <div className="input-container">
                <input type="text" name="iban" value={bankNumber} onChange={(e) => setBankNumber(e.target.value)}/>
                <label htmlFor="input">Bank account number (or IBAN if applicable)*</label>
              </div>
              <p style={{ width: "100%" }}>Please note that the currency we transfer to your bank account will be in USD.</p>
              <button style={{ marginTop: "5px", marginBottom: "10px" }} onClick={() => update()}>Update</button>
            </div>

            <div className="form" style={{ boxShadow: "none", marginTop: "90px" }}>
              <h1>Activation</h1>
              <p style={{ width: "100%" }}>Before starting, please, read the <Link to={`${process.env.REACT_APP_ONESUBS}/business-rules`} style={{ color: "#10b981" }}><b>Business Account Rules and Policy</b></Link> at OneSubs. To accept the rules and activate your service, write "activate" below and submit.</p>
              <p style={{ marginBottom: "50px", width: "100%" }}>To deactivate, write "deactivate" and submit. This will return back to testing mode.</p>
              <div className="input-container">
                <input type="text" name="activation" value={status} onChange={(e) => setStatus(e.target.value)}/>
                <label htmlFor="input">Accept the Rules and Activate or Deactivate</label>
              </div>
              <p style={{ width: "100%" }}>Note that you can update the service logo, price, service information or bank account number only in testing mode.</p>
              <button style={{ marginTop: "5px", marginBottom: "10px" }} onClick={() => activate()}>Submit</button>
            </div>

          </div>
        </div>



        <div className="right" style={{textAlign: "start"}}>
          <p style={{ marginTop: "90px", fontWeight: "bold" }}>Your Logo</p>
          <p>OneSubs will advertise your service on the Services page. To make it easier for users to find your tool, we recommend adding the link to your service logo.</p>
          <p style={{ marginTop: "100px", fontWeight: "bold" }}>How to get your service price?</p>
          <p>1. Determine your monthly subscription price.</p>
          <p>2. Subtract approximately 5% for payment processing fees.</p>
          <p>3. Divide the adjusted price by 30 to find the daily price.</p>
          <p style={{ fontWeight: "bold" }}>For example:</p>
          <p>• Monthly subscription price: $19</p>
          <p>• Payment processing fees (5%): $0.95</p>
          <p>• Adjusted price: $18.05</p>
          <p>• Daily price: $18.05 ÷ 30 ≈ $0.60</p>
          <p style={{ marginTop: "100px", fontWeight: "bold" }}>What is S, M, L, XL or XXL?</p>
          <p>These are the service tiers. Users can access your service if they have a subscription that includes your tier. We recommend lowering your tier as much as possible to make your service affordable for more subscription plans.</p>
          <p style={{ marginTop: "100px", fontWeight: "bold" }}>Business Information</p>
          <p>Be careful with your company information. After the first activation of your service, you cannot update it, even in testing mode.</p>
          <p>If you find mistakes after activation, you must email a request to change your business information.</p>
          <p style={{ marginTop: "100px", fontWeight: "bold" }}>Bank Details</p>
          <p>Double-check your bank information carefully. At the end of each month, we will check your balance and transfer the earned amount.</p>
          <p>The transferred amount must be a minimum of $100. If it is less than the minimum, we will transfer it the next month.</p>
          <p style={{ marginTop: "100px", fontWeight: "bold" }}>Updating</p>
          <p>You can update your service logo URL, price, name, website, details, and bank information at any time in testing mode. Before updating, you need to switch from active to testing mode.</p>
          <p>You cannot update your business's legal name, registration number, tax number, company address, or company contacts after the first activation.</p>
          <p style={{ marginTop: "100px", fontWeight: "bold" }}>Account Status</p>
          <p>You can activate or deactivate your account status at any time. When you deactivate, it automatically changes to testing mode.</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;