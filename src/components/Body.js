import RestaurantCard from './RestaurantCard';
import { useState } from 'react';
import Shimmer from './shimmer';
import useCards from '../utils/useCards';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import { useSelector } from 'react-redux';

const Body = () => {
  const [searchText, setsearchText] = useState(''); // search box
  const { listOfRestaurants, filteredRestaurants, setFilteredRestaurants } =
    useCards();
  const onlineStatus = useOnlineStatus();
  const user = useSelector((store) => store.user);
  //  Conditional Rendering
  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  if (onlineStatus === false)
    return <h1>Look like you're offline please Check Your Internet</h1>;

  return (
    <div className="bg-[#f7f4f2] mt-24">
      <div className="filter flex justify-evenly  ">
        <div className="search m-1 p-2 ">
          <input
            type="text"
            className="border border-solid border-black mx-1 px-2 py-1 rounded-lg"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          ></input>
          <button
            className="px-4 py-2 bg-gray-300 m-4 items-center justify-center rounded-lg"
            onClick={() => {
              const filteredres = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredres);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center ">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg "
            onClick={() => {
              const filtered = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.3
              );
              setFilteredRestaurants(filtered);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      <div className="res-container flex flex-wrap  items-center gap-[30px] m-[30px]  justify-center  ">
        {filteredRestaurants.map((restaurant, index) => (
          <Link
            key={index}
            to={`/restaurants/${restaurant.info.id}/${restaurant.info.name}`}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
