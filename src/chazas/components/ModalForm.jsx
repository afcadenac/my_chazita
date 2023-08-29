import Modal from "react-modal"
import { useForm, useUiStore } from "../../hook";
import { useEffect } from "react";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement("#root");

export const ModalForm = ({make}) => {
    const {isModalOpen,closeModal,currentValue,ChangeValue}=useUiStore();
    const {formState,onInputChange,setFormState}=useForm(currentValue);

    const convertToVector=()=>{
        let vector=[];

        for (const valueKey of Object.keys(currentValue)) {
            if(valueKey==="_id" || valueKey==="chaza") continue
            vector.push({
                name:valueKey,
                value:currentValue[valueKey]
            });
        }
        return vector;
    }
    
    useEffect(() => {
      setFormState(currentValue);
    }, [currentValue])
    

    const onSubmitForm=(e)=>{
        e.preventDefault();
   
    }

  return (
    <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
    >

        <h1>Modal</h1>
        <hr />
        <form onSubmit={onSubmitForm} className="container">
            {
                convertToVector().map((i)=>(
                    <div key={i.name} className="form-group mb-2"> 
                  
                        <input className="form-control" type="text" name={i.name} value={formState[i.name] || ""} onChange={onInputChange} placeholder={i.name}></input>
                    </div>
                    
                ))
            }
            <button className="btn btn-primary" onClick={()=>make(formState)}>Enviar</button>
        </form>
        
    </Modal>
  )
}
