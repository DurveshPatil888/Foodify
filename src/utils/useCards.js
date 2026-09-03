import { useState, useEffect } from 'react';
const useCards = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]); // Original complete restaurant list yithe purn api cha data store hoyil
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // filtered list, UI madhe je change hoyil te

  console.log('Body rendered');
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.0179252&lng=73.8167031&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    );

    const json = await res.json();

    const cards = json.data.cards;

    const restaurantCard = cards.find(
      (card) => card.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    const restaurants =
      restaurantCard.card.card.gridElements.infoWithStyle.restaurants;

    setListOfRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  };
  return { listOfRestaurants, filteredRestaurants, setFilteredRestaurants };
};

export default useCards;
