import { useEffect } from "react";
import { useUserStore } from "../../hook"
import { ChazaFilter, UsersTable } from "../components"

export const UsersPage = () => {
  const {startLoadUser,startFilterUser}=useUserStore(); 

  useEffect(() => {
    startLoadUser();
  }, []);

  const onFilter=(filter)=>{
    startFilterUser(filter);
  }
  
  return (
    <>
      <div className='container text-center' >
        <div className="row-2 mt-4 mb-4">

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
