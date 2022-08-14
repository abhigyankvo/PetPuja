import delivery from "../assets/img/delivery.png";
import heroBg from "../assets/img/heroBg.png";
import { staticCardData } from "../utils/data";
const HomeContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full lg:h-[calc(100vh_-_100px)]">
      <div className="py-2 flex-1 flex flex-col gap-6 items-start md:justify-center">
        <div className="flex items-center justify-center gap-2 bg-orange-100 rounded-full px-4 py-2">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={delivery}
              alt="Bike Delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4rem] font-bold tracking-wide">
          The Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[4.5rem]">
            Your City
          </span>
        </p>
        <p className="text-textColor text-base text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
          voluptas cumque unde, in eum distinctio est fugit libero ab quisquam
          sit laboriosam omnis deleniti reprehenderit. Tempore, praesentium
          repellendus! Tempora, at.
        </p>
        <button
          className="text-white bg-gradient-to-br from-orange-400 to-orange-500 
          w-full px-4 py-2 rounded-lg md:w-auto
          hover:shadow-lg 
        "
        >
          Order Now
        </button>
      </div>
      <div className="p-2 flex-1 flex items-center relative">
        <img
          src={heroBg}
          alt="Hero Background"
          className="ml-auto w-full h-[420px] lg:w-auto lg:h-[650px] "
        />
        <div className="w-full h-full absolute top-0 left-0 flex flex-wrap gap-4 px-1 py-4 lg:px-16 lg:py-8 items-center justify-center">
          {staticCardData.map((card) => (
            <div
              key={card.id}
              className="w-32 p-2 lg:w-48 lg:p-4 bg-cardOverlay backdrop-blur-sm rounded-2xl border border-gray-100 flex flex-col items-center justify-center"
            >
              <img
                src={card.imgSrc}
                alt={card.name}
                className="w-20 -mt-10 lg:w-40 lg:-mt-20"
              />
              <p className="text-sm lg:text-base font-semibold text-textColor mt-1 lg:mt-4">
                {card.name}
              </p>
              <p className="text-[0.6rem] lg:text-sm font-semibold text-lightTextColour my-1 lg:my-2">
                {card.desc}
              </p>
              <p className="text-base lg:text-sm text-headingColor font-semibold">
                <span className="text-xs text-red-600">$ </span>
                {card.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
