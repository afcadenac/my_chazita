import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

export const MapaChazas = ({ lat, lon, nameChaza }) => {
  const styles = {
    width: "100%",
    height: "100%",
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/3601/3601465.png",
    iconSize: [30, 30],
  });

  return (
    <>
      <MapContainer
        style={styles}
        center={[lat, lon]}
        zoom={18}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]} icon={customIcon}>
          <Popup>
            <h2>{nameChaza}</h2>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};
