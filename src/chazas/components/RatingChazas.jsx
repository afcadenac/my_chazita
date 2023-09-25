import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import capuchoFill  from "../../assets/capucho.ico";
import  capuchoOutFill  from "../../assets/capuchont.ico";
import "../../styles.css";

export const RatingChazas = (props) => {


  return (
    <div>
      <span className="me-2">Calificación:</span>  
      
      {
        [... new Array(5)].map((star, index)=>{
            return (index < props.score ? <img src={capuchoFill} key={index}/> : <img src={capuchoOutFill} key={index}/>)
        })
      }
    </div>
  );
};
