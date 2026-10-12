import { CDN_URL } from '../utils/constants';

const badgeColors = [
  'bg-blue-600',
  'bg-amber-400 text-slate-900',
  'bg-red-600',
  'bg-emerald-600',
  'bg-orange-500',
];

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } =
    resData.info;
  const discount = resData.info.aggregatedDiscountInfoV3;
  const imageUrl = cloudinaryImageId ? CDN_URL + cloudinaryImageId : '';
  let text = '';
  if (discount) {
    if (discount.subHeader) {
      text = discount.header + ' ' + discount.subHeader;
    } else {
      text = discount.header;
    }
  }
  const colorIndex = (name?.length || 0) % badgeColors.length;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div className="relative w-full h-[180px]">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt={name}
          loading="lazy"
        />
        {text ? (
          <div
            className={`absolute top-3 left-3 ${badgeColors[colorIndex]} text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md shadow`}
          >
            {text}
          </div>
        ) : null}
      </div>

      <div className="p-3.5">
        <h3 className="font-bold text-slate-900 truncate">{name}</h3>
        <p className="text-sm text-slate-500 truncate mt-0.5">
          {cuisines.join(', ')}
        </p>
        <div className="mt-2 flex items-center justify-between text-sm text-slate-700">
          <span className="inline-flex items-center gap-1 font-semibold">
            ★ {avgRating}
          </span>
          <span>{sla?.deliveryTime} mins</span>
          <span>{costForTwo}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
