import { useChazaStore } from "../../hook";
import { ChazaCard } from "./ChazaCard";
import "../../styles.css";



export const ChazaList = () => {
    const {chazas}=useChazaStore();
  return (
    <div className="container p-2">
      {chazas.map((chaza)=>{
          return (<ChazaCard key={chaza._id} chaza={chaza}/>)
      })}
    </div>
  )
}
