import { ProductCard } from './'

const products=[{
  id:1,
  name:"aguapanela",
  price:2000,
  stock:10,
  type:"bebida",
  desc:"sasasasas"
},
{
  id:2,
  name:"papitas",
  price:2000,
  stock:10,
  type:"comida",
  desc:""
},
{
  id:3,
  name:"masaje :v",
  price:2000,
  stock:10,
  type:"servicio",
  desc:"adada"
},
{
  id:4,
  name:"empanada",
  price:3000,
  stock:10,
  type:"comida",
  desc:"adadad"
}

];

export const ProductList = () => {
  return (
    <div className='row  border border-dark bg-primary mb-4 p-3'>
        {
          products.map((product)=><ProductCard key={product.id} list={product}/>)
        }
    </div>
  )
}
