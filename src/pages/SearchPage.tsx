import { useSearchRestaurant } from "@/api/RestaurantApi";
import FoodTypeFilter from "@/components/FoodTypeFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultsCard from "@/components/SearchResultsCard";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery : string;
  page: number;
  selectedFoodTypes: string [];
  sortOption: string;
}

const SearchPage = () => {
    const {restaurantAddress} = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
      searchQuery: "",
      page: 1,
      selectedFoodTypes: [],
      sortOption: "bestMatch"
    })
    
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { results, isLoading} = useSearchRestaurant(searchState, restaurantAddress);

    const setSortOption = (sortOption: string) => {
      setSearchState((prevState) => ({
        ...prevState,
        sortOption,
        page: 1
      }))
    }

    const setSelectedFoodTypes = (selectedFoodTypes: string []) => {
      setSearchState((prevState) => ({
        ...prevState,
        selectedFoodTypes,
        page: 1
      }))
    }

    const setPage = (page: number) => {
      setSearchState((prevState) => ({
        ...prevState,
        page
      }))
    }

    const setSearchQuery = (searchFormData: SearchForm) => {
      setSearchState((prevState)=> ({
        ...prevState,
        searchQuery: searchFormData.searchQuery,
        page: 1
      }));
    }

    const resetSearch = () => {
      setSearchState((prevState)=> ({
        ...prevState,
        searchQuery: "",
        page: 1
      }));
    }

    if (isLoading)
      return <span>Loading ...</span>

    if(!results?.data || !restaurantAddress)
      return <span>No Results Found</span>


    return (
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 bg-white rounded-xl m-7 p-5">
        <div id="foodType-list"> <FoodTypeFilter  selectedFoodTypes={searchState.selectedFoodTypes} onChange={setSelectedFoodTypes} 
          isExpanded={isExpanded} onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}/></div>
        <div id="main-content" className="flex flex-col gap-5">
          <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder="Search by cuisine or restaurant name" onReset={resetSearch}/>
          <div className="flex justify-between flex-col gap-3 lg:flex-row">
            <SearchResultInfo total={results.pagination.total} restaurantAddress={restaurantAddress}/>
            <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)}/>
          </div>
          {results.data.map((restaurant) => (
            <SearchResultsCard restaurant={restaurant}/>
          ))}
          <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage}/>
        </div>
      </div>
    )
}

export default SearchPage;