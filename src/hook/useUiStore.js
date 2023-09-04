import { useDispatch, useSelector } from "react-redux"
import { onChangeValue, onChangeValueSelector, onCloseModal, onOpenModal } from "../store/slices/uiSlice";


export const useUiStore = () => {

    const {isModalOpen,currentValue,currentValueSelector}=useSelector((state)=>state.ui);
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

    const ChangeValueSelector=(value)=>{
        dispatch(onChangeValueSelector(value));
    }

    return {
        isModalOpen,
        currentValue,
        currentValueSelector,

        openModal,
        closeModal,
        ChangeValue,
        ChangeValueSelector
    }
}
