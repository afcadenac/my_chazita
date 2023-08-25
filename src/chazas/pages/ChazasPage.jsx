import { Navbar } from "../"
import { ChazaFilter, ChazaResult } from "../components"


export const ChazasPage = () => {
  return (
    <>
      <div className='container text-center bg-info ' >
        <div className="row-2 mt-4 mb-4">
          <ChazaFilter/>
          <ChazaResult/>
        </div>
      </div>
    </>
  )
}
