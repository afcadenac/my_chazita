import { getEnvVariables } from "../../helpers";
import {
  useAuthStore,
  useChazaStore,
  useProductStore,
  useUiStore,
} from "../../hook";
import placeholderImage from "../../assets/images/imageDefault.jpg";
import "../../styles.css";
import "animate.css";

export const ProductCard = ({ list = {} }) => {
  const { currentChaza } = useChazaStore();
  const { user } = useAuthStore();
  const {
    ChangeValue,
    openModal,
    ChangeValueSelector,
    openModalPhoto,
    closeModalPhoto,
    ChangeTypePhoto,
  } = useUiStore();
  const { startDeleteProduct } = useProductStore();

  const onChangeValue = () => {
    if (list.chaza === user.chaza) {
      ChangeValueSelector({
        type: ["bebida", "comida", "servicio", "otro"],
      });
      ChangeValue(list);
    }
  };

  const onOpenModal = () => {
    if (list.chaza === user.chaza) {
      openModal();
    }
  };

  const onOpenModalPhoto = (photo) => {
    ChangeTypePhoto("product");
    openModalPhoto();
  };

  return (
    <div
      className="card cardshadow cardstyle p-0 border-dark animate__animated animate__fadeInUp"
      onClick={() => ChangeValue(list)}
      onDoubleClick={openModal}
    >
      <div className="row g-0 imgp">
        <div className="col-md-4 allcard">
          <img
            src={
              list.photo === "Por definir" ||
              list.photo === undefined ||
              list.photo === null
                ? placeholderImage
                : getEnvVariables().VITE_PHOTO_URL + list.photo
            }
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
            {user.chaza === list.chaza && (
              <>
                <button
                  className="btn btn-primary mb-2 mx-2"
                  onClick={onOpenModalPhoto}
                >
                  cambiar foto
                </button>
                <button
                  className="btn btn-danger mb-2"
                  onClick={() => startDeleteProduct(list)}
                >
                  eliminar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
