import { useEffect } from "react";
import { useUserStore } from "../../hook"
import { ChazaFilter, UsersTable } from "../components"

const user=[
  {
    id: "64d42dc9c2327faf282ac740",
    name: "andresfcc8",
    email: "andres3@correo.com",
    password: "$2a$10$c6yTPN/1uGrGSZuXJGgJ9O2CJ113GaAXt3HxCJWJeDUE1ulEeOV1G",
    type: "Cliente",
  },
  {
    id: "64e78e84cc398f97e5335a4a",
    name: "andreus ",
    email: "mateus@correo.com",
    password: "$2a$10$vhh6onaEVbs1lg30FP4rhenaxImVqqG2prCK07fohTN.VJhRPwGXm",
    type: "cliente",
  }
]

export const UsersPage = () => {
  const {startLoadUser}=useUserStore(); 

  useEffect(() => {
    startLoadUser();
  }, [])
  
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
