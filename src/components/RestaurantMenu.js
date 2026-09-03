import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addItem } from '../utils/redux/cartSlice';
import { useDispatch } from 'react-redux';
const RestaurantMenu = () => {
  const { resName } = useParams();
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  useEffect(() => {
    fetchMenu();
  }, [resName]);
  const shuffleArray = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  const fetchMenu = async () => {
    const res = await fetch(
      'https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian'
    );
    const json = await res.json();
    const shuffledMenu = shuffleArray(json.meals);
    setMenu(shuffledMenu);
  };

  return (
    <div className="menu flex flex-col my-5 items-center mt-32  ">
      <h1 className="font-bold text-2xl">{resName}</h1>
      <h2 className="my-3 font-semibold text-xl">Menu</h2>
      <div className="my-2 max-w-[auto] mx-auto ">
        <ul className=" flex flex-col gap-1 text-[17px]  ">
          {menu.slice(2).map((item, i) => (
            <li
              className="text-left flex justify-between w-full gap-10 border-b-2 hover:bg-gray-50 "
              key={item.idMeal}
            >
              <span className=" flex-1 truncate">{item.strMeal}</span>
              <span className="text-gray-500 font-medium py-[2px] text-center w-16">
                ₹{150 + i * 10}
              </span>
              <button
                className="px-2 py-[2px] bg-gray-700 text-white m-2 items-center justify-center rounded-lg text-[12px]"
                onClick={() => handleAddItem(item)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
