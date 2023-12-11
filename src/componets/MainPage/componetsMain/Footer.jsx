import FooterInFooter from "./componetsFooter/FooterInFooter";
import NavInFooter from "./componetsFooter/NavInFooter";

function Footer(){
    return (
        <footer className="footerDelivery" style={{
            overflowX:"hidden"
        }}>
            <div className="divInFooter">
                
                <article>
                    <h2 className="inFooter">О компании</h2>
                    <NavInFooter/>                    
                </article>
                <FooterInFooter/>
            </div>
        </footer>
    )
}
export default Footer;