import SearchBar, { SearchForm } from "@/components/SearchBar";
import hero from "../assets/t4gag1e6fmeokhs7mt3g58vhbt.png"
import { useNavigate } from "react-router-dom";

const HomePage=()=> {
    const greet= () => {
        const hour = new Date().getHours();
    
          if (hour < 11) {
            return (
              <>
                <h1 className="text-5xl font-bold tracking-tight text-white mb-5">Good Morning</h1>
                <h1 className="font-3xl font-bold text-orange-600">What's for breakfast?</h1>
              </>
            );
          } else if (hour < 18) {
            return (
              <>
                <h1 className="text-5xl font-bold tracking-tight text-white mb-5">Good Afternoon</h1>
                <h1 className="font-3xl font-bold text-orange-600">What's for lunch?</h1>
              </>
            );
          } else {
            return (
              <>
                <h1 className="text-5xl font-bold tracking-tight text-blue-500 mb-5">Good Evening</h1>
                <h1 className="font-bold text-orange-600">What's for dinner?</h1>
              </>
            );
          }
        }

  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm)  => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
<div className="flex flex-col items-center gap-8 bg-transparent">
    <div className="flex flex-row gap-12 items-center bg-transparent">
        <div>
            <img src={hero} className="object-cover rounded-full bg-slate-50 border-gray-800 border-8" />
        </div>
        <div className="bg-gray-900 rounded-3xl shadow-2xl px-8 py-4 text-center text-white p-15 pb-20 pt-20  border-t-5 border-orange-500">
            <div>{greet()}</div>
        </div>
    </div>

    <div className="w-full">
        <SearchBar placeHolder="Search by location" onSubmit={handleSearchSubmit} />
    </div>
</div>
  )
}

export default HomePage