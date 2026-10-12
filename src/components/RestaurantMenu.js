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
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken'
    );

    const json = await res.json();

    const meals = json.meals ?? [];
    const shuffledMenu = shuffleArray(meals);

    setMenu(shuffledMenu.slice(0, 13));
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-orange-100 shadow-sm p-8">
        <h1 className="font-extrabold text-2xl text-slate-900">{resName}</h1>
        <h2 className="mt-1 font-semibold text-orange-500">Menu</h2>
        <ul className="mt-4 flex flex-col gap-1 text-[17px]">
          {menu.slice(2).map((item, i) => (
            <li
              className="text-left flex justify-between items-center w-full gap-4 border-b border-slate-100 hover:bg-orange-50/60 px-1"
              key={item.idMeal}
            >
              <span className="flex-1 truncate">{item.strMeal}</span>
              <span className="text-orange-600 font-medium py-[2px] text-center w-16">
                ₹{150 + i * 10}
              </span>
              <button
                className="px-3 py-1 bg-orange-500 text-white m-2 rounded-full text-[12px] font-semibold"
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
