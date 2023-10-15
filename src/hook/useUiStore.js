import { useDispatch, useSelector } from "react-redux"
import { onChangeIsLoading, onChangeTypePhoto, onChangeValue, onChangeValueSelector, onCloseModal, onCloseModalPhoto, onOpenModal, onOpenModalPhoto } from "../store/slices/uiSlice";


export const useUiStore = () => {

    const {isModalOpen,currentValue,currentValueSelector,isModalPhotoOpen, currentTypePhoto, isLoadingRequest}=useSelector((state)=>state.ui);
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

    const ChangeIsLoading=(value)=>{
        dispatch(onChangeIsLoading(value));
    }

    return {
        isModalOpen,
        currentValue,
        currentValueSelector,
        isModalPhotoOpen,
        currentTypePhoto,
        isLoadingRequest,

        openModal,
        closeModal,
        ChangeValue,
        ChangeValueSelector,
        closeModalPhoto,
        openModalPhoto,
        ChangeTypePhoto,
        ChangeIsLoading
    }
}
