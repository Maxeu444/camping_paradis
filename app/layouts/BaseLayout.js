import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BaseLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}