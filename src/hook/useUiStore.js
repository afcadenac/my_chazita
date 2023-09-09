import { useDispatch, useSelector } from "react-redux"
import { onChangeTypePhoto, onChangeValue, onChangeValueSelector, onCloseModal, onCloseModalPhoto, onOpenModal, onOpenModalPhoto } from "../store/slices/uiSlice";


export const useUiStore = () => {

    const {isModalOpen,currentValue,currentValueSelector,isModalPhotoOpen, currentTypePhoto}=useSelector((state)=>state.ui);
    const dispatch=useDispatch();

    const openModal=()=>{
        dispatch(onOpenModal());
    }

    const closeModal=()=>{
        dispatch(onCloseModal());
    }

    const openModalPhoto=()=>{
        dispatch(onOpenModalPhoto());
    }

    const closeModalPhoto=()=>{
        dispatch(onCloseModalPhoto());
    }

    const ChangeValue=(value)=>{
        dispatch(onChangeValue(value));
    }

    const ChangeValueSelector=(value)=>{
        dispatch(onChangeValueSelector(value));
    }

    const ChangeTypePhoto=(value)=>{
        dispatch(onChangeTypePhoto(value));
    }

    return {
        isModalOpen,
        currentValue,
        currentValueSelector,
        isModalPhotoOpen,
        currentTypePhoto,

        openModal,
        closeModal,
        ChangeValue,
        ChangeValueSelector,
        closeModalPhoto,
        openModalPhoto,
        ChangeTypePhoto
    }
}
