import { ChazaFilter, ChazaInfo, ProductList } from "../components"


export const InventoryPage = () => {
  return (
    <div className='container text-center' >
        <div className="row-2 mt-4 mb-4">
          <ChazaInfo/>
          <ChazaFilter/>
          <ProductList/>
          {/* <ChazaResult/> */}
        </div>
      </div>
  )
}
