import { useEffect } from "react";
import { useUserStore } from "../../hook"
import { ChazaFilter, UsersTable } from "../components"

export const UsersPage = () => {
  const {startLoadUser}=useUserStore(); 

  useEffect(() => {
    startLoadUser();
  }, []);
  
  return (
    <>
      <div className='container text-center' >
        <div className="row-2 mt-4 mb-4">
          <ChazaFilter/>
          <UsersTable/>
        </div>
      </div>
    </>
  )
}
