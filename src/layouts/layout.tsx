import Footer from "@/components/Footer";
import Header from "@/components/Header";


type Props = {
    children: React.ReactNode;
}

const layout = ({children}: Props) => {
    return (
        <div className="bg-[url('.\assets\10755981.jpg')] bg-cover bg-center min-h-screen">
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="container mx-auto flex-1 py-10">{children}</div>
            <Footer/>
        </div>
        </div>
    )
}

export default layout;