import producto from "../../assets/images/producto.jpg";
import {
  useAuthStore,
  useChazaStore,
  useProductStore,
  useUiStore,
} from "../../hook";
import 'animate.css';
import "../../styles.css";

export const ProductCard = ({ list = {} }) => {
  const { currentChaza } = useChazaStore();
  const { user } = useAuthStore();
  const { ChangeValue, openModal } = useUiStore();
  const { startDeleteProduct } = useProductStore();

  return (
    <div
      className="card cardshadow cardstyle p-0 border-dark animate__animated animate__fadeInUp" 
      onClick={() => ChangeValue(list)}
      onDoubleClick={openModal}
    >
      <div className="row g-0 imgp">
        <div className="col-md-4 allcard">
          <img
            src={producto}
            className="img-fluid rounded-start imag"
            alt="..."
          />
        </div>
        <div className="col-md-8 ">
          <div className="card-body ">
            <h5 className="card-title ">{list.name}</h5>
            <div className="row mt-2 mb-2">
              <label className="col">Precio: {list.price}</label>
              <label className="col">Stock: {list.stock}</label>
              <label className="col">Tipo: {list.type}</label>
            </div>
            <p className="card-text ">
              <small className="text-muted">
                Descripcion: {list.description}
              </small>
            </p>

            {user.chaza === currentChaza._id ? (
              <button
                className="btn btn-danger mb-2"
                onClick={() => startDeleteProduct(list)}
              >
                eliminar
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
