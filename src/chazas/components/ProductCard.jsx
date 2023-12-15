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
import Swal from "sweetalert2";

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

  const onDeleteProduct=(deleteProduct)=>{
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText:"Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        startDeleteProduct(deleteProduct);
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        )
      }
    });
  }

  return (
    <div
      className="card cardshadow cardstyle p-0 border-dark animate__animated animate__fadeInUp "
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
            className="img-fluid rounded-start imag card-photo"
            alt="..."
          />
        </div>

        <div className="col-md-8 card-photo">
          <div className={(user.chaza === list.chaza )?"card-body scroll-product card-photo-2 mb-3":"card-body scroll-product card-photo-3 mb-3"}>
            <h5 className="card-title texts">{list.name}</h5>
            <div className="row mt-2 mb-2">
              <span className="col">Precio: {list.price}</span>
              <span className="col">Stock: {list.stock}</span>
              <span className="col texts">Tipo: {list.type}</span>
            </div>
            <p className="card-text ">
              <small className="text-muted texts">
                Descripcion: {list.description}
              </small>
            </p>
            
          </div>
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
                  onClick={() => onDeleteProduct(list)}
                >
                  eliminar
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
};
