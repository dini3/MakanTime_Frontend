const Footer = () => {
  return (
    <div className="py-10 border-t-2 border-t-orange-500  bg-gray-900">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <span className="text-3xl text-orange-500 font-bold tracking-tight" >
                MakanTime
            </span>
            <span className="text-white font-bold tracking-tight flex gap-4">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
            </span>
        </div>
    </div>
  )
}

export default Footer