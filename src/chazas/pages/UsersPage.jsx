import { useEffect } from "react";
import { useUiStore, useUserStore } from "../../hook"
import { ChazaFilter, UsersTable } from "../components"
import { LoadingPage } from "./LoadingPage";


export const UsersPage = () => {
  const {startLoadUser,startFilterUser,users}=useUserStore(); 

  const {isLoadingRequest}=useUiStore();

  useEffect(() => {
    startLoadUser();
  }, []);


  const onFilter=(filter)=>{
    startFilterUser(filter);
  }

  if(isLoadingRequest){
    return <LoadingPage/>
  }

  return (
    <>
      <div className='container text-center filtro' >
        <div className="container text-center bgeneral animate__animated animate__fadeInUp chazacont">

          <ChazaFilter
          filter={{
            type:"ninguno",
            order:"ninguno"
          }} 
          config={{
            type:["ninguno","Cliente","Dueño"],
            order:["ninguno","Ascendente","descendente"]
          }}
          cb={onFilter}
          />

          <UsersTable/>

        </div>
      </div>
    </>
  )
}
