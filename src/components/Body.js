import RestaurantCard from './RestaurantCard';
import { useState } from 'react';
import Shimmer from './shimmer';
import useCards from '../utils/useCards';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import { getCategoryImage } from '../utils/constants';

const Body = () => {
  const [searchText, setsearchText] = useState('');
  const { listOfRestaurants, filteredRestaurants, setFilteredRestaurants } =
    useCards();
  const onlineStatus = useOnlineStatus();

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  if (onlineStatus === false)
    return (
      <h1 className="pt-28 text-center text-slate-600">
        Look like you're offline please Check Your Internet
      </h1>
    );

  const trending = listOfRestaurants.slice(0, 6);
  const skipCategories = ['beverages', 'beverage', 'waffle', 'waffles'];
  const cuisineNames = [];
  listOfRestaurants.forEach((res) => {
    (res.info.cuisines || []).forEach((cuisine) => {
      const key = cuisine.toLowerCase();
      if (
        !skipCategories.includes(key) &&
        !cuisineNames.includes(cuisine)
      ) {
        cuisineNames.push(cuisine);
      }
    });
  });
  const categories = cuisineNames.slice(0, 8);

  const runSearch = (text) => {
    const query = (text ?? searchText).toLowerCase();
    const filteredres = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(query)
    );
    setFilteredRestaurants(filteredres);
  };

  return (
    <div className="bg-white pt-[72px]">
      <section className="bg-gradient-to-b from-orange-50 via-[#fff7ed] to-white">
        <div className="max-w-4xl mx-auto px-4 pt-12 pb-10 text-center">
          <p className="inline-flex items-center gap-2 text-xs font-medium text-orange-600 bg-white/80 border border-orange-100 rounded-full px-3 py-1 mb-5">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            Instant Delivery nearby
          </p>
          <h1 className="text-3xl md:text-[44px] font-extrabold text-slate-900 leading-tight tracking-tight">
            Hungry? Order your favorite
            <br className="hidden md:block" /> cravings now.
          </h1>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            Explore iconic local diners, top-rated sweet shops, gourmet bakeries
            & fast foods delivered steaming hot!
          </p>

          <div className="mt-8 flex items-center max-w-xl mx-auto bg-white rounded-full border border-slate-200 shadow-sm overflow-hidden">
            <span className="pl-4 text-slate-400">🔍</span>
            <input
              type="text"
              className="flex-1 px-3 py-3 outline-none text-sm"
              placeholder="Search for restaurants, dishes..."
              value={searchText}
              onChange={(e) => {
                setsearchText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') runSearch();
              }}
            />
            <button
              className="m-1 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-full"
              onClick={() => runSearch()}
            >
              Search
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-semibold tracking-wider text-slate-400">
              TRENDING:
            </span>
            {trending.map((res) => (
              <button
                key={res.info.id}
                className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600"
                onClick={() => {
                  setsearchText(res.info.name);
                  runSearch(res.info.name);
                }}
              >
                {res.info.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 pt-6 pb-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            What's on your mind?
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Pick from culinary categories curated just for you
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-6">
            {categories.map((cuisine) => (
              <button
                key={cuisine}
                className="shrink-0 w-24 text-center"
                onClick={() => {
                  const filtered = listOfRestaurants.filter((res) =>
                    (res.info.cuisines || []).includes(cuisine)
                  );
                  setFilteredRestaurants(filtered);
                }}
              >
                <img
                  src={getCategoryImage(cuisine)}
                  alt={cuisine}
                  className="w-20 h-20 mx-auto rounded-full object-cover shadow-md ring-2 ring-white"
                />
                <span className="mt-2 block text-xs font-medium text-slate-700 leading-tight">
                  {cuisine}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-[1200px] mx-auto px-6 pt-8 pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Popular Restaurants
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Showing {filteredRestaurants.length} spots delivering right now
            </p>
          </div>
          <button
            className="self-start px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-full shadow-sm hover:bg-orange-600"
            onClick={() => {
              const filtered = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.3
              );
              setFilteredRestaurants(filtered);
            }}
          >
            Top Rated (★ 4.3+)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
            <Link
              key={index}
              to={`/restaurants/${restaurant.info.id}/${restaurant.info.name}`}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Body;
