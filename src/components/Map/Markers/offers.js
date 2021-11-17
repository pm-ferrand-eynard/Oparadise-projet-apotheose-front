/* eslint-disable react/prop-types */
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { Link } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';

const Offers = ({
  id, position, url, title,
}) => {
  // const icon = divIcon({
  //   icon: markerIconPng,
  //   iconSize: [0, 0],
  //   iconAnchor: [10, 41],
  //   popupAnchor: [2, -40],
  // });
  const customHouse = renderToStaticMarkup(
    <img
      src="https://img.icons8.com/color/48/000000/cottage.png"
      alt="cocktail marker"
    />,
  );
  const iconHouse = divIcon({
    html: customHouse,
    iconSize: [0, 0],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  return (
    <Marker key={id} icon={iconHouse} position={[position.latitude, position.longitude]}>
      <Popup>
        <img
          src={url}
          alt="offers house"
        />
        <p>{title}</p>
        <Link to={`/offer/${id}`}> En savoir plus...</Link>
      </Popup>
    </Marker>

  );
};

export default Offers;
