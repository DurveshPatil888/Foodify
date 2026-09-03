import { CDN_URL } from '../utils/constants';

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } =
    resData.info;
  const discount = resData.info.aggregatedDiscountInfoV3;
  const imageUrl = cloudinaryImageId ? CDN_URL + cloudinaryImageId : '';
  let text = '';
  if (discount) {
    if (discount.subHeader) {
      text = discount.header + ' - ' + discount.subHeader;
    } else {
      text = discount.header;
    }
  }
  return (
    <div
      className=" w-[250px]
               flex flex-col
             bg-[#f7f4f2]
              text-black
               rounded-[10px]
               p-[6px]
              box-border h-auto gap-2 transition-all duration-300 ease-out
              hover:-translate-y-2
              hover:shadow-xl  "
    >
      <div className="relative w-full h-[150px] ">
        <img
          className="res-logo w-full h-full object-cover rounded-[10px]"
          src={imageUrl}
          alt={name}
          loading="lazy"
        />
        <div
          className="absolute bottom-2 left-2
                bg-black/70 text-white
                text-sm font-semibold shadow-xl
                px-2 py-1 justify-center rounded"
        >
          {text}
        </div>
      </div>

      <h3 className="mt-2 font-semibold truncate">{name}</h3>
      <div className="logocontent ">
        <h4 className="truncate">{cuisines.join(', ')}</h4>

        <h4>
          ⭐ {avgRating} • ⏱ {sla?.deliveryTime} mins
        </h4>
        <h4>{costForTwo}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
