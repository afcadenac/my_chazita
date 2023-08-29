import { useDispatch, useSelector } from "react-redux"
import { onChangeValue, onCloseModal, onOpenModal } from "../store/slices/uiSlice";


export const useUiStore = () => {

    const {isModalOpen,currentValue}=useSelector((state)=>state.ui);
    const dispatch=useDispatch();

    const openModal=()=>{
        dispatch(onOpenModal());
    }

    const closeModal=()=>{
        dispatch(onCloseModal());
    }

    const ChangeValue=(value)=>{
        dispatch(onChangeValue(value));
    }

    return {
        isModalOpen,
        currentValue,

        openModal,
        closeModal,
        ChangeValue
    }
}
