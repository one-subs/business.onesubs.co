import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../styles/images/logo_blue.svg';

function Footer() {

    return (
        <div className="footer">
            <div>
                <Link to={process.env.REACT_APP_ONESUBS}><Logo style={{ maxWidth: '140px', maxHeight: '50px', float: 'left' }}/></Link>
                <Link to={`${process.env.REACT_APP_ONESUBS}/terms-of-use`}><span style={{marginTop: "18px"}}>&copy; {new Date().getFullYear()} OneSubs</span></Link>
            </div>
            <div className="pages">
                <Link to={`${process.env.REACT_APP_ONESUBS}/about-us`}><span>About us</span></Link>
                <Link to={`${process.env.REACT_APP_ONESUBS}/contact`}><span>Contact</span></Link>
                <Link to={`${process.env.REACT_APP_ONESUBS}/business-requirements`}><span>Requirements</span></Link>
                <Link to={`${process.env.REACT_APP_ONESUBS}/business-rules`}><span>Rules and Policy</span></Link>
            </div>
        </div>
    );
}

export default Footer;