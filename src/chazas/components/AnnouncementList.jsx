import { useAuthStore } from "../../hook";
import { useAnnouncementStore } from "../../hook/useAnnouncementStore";
import { AnnouncementCard } from "./AnnouncementCard";


export const AnnouncementList = () => {

    const {status}=useAuthStore();
    const {announcements,startOpenAnnouncement,startChangeCurrentAnnouncement}=useAnnouncementStore();

    const onNewAnnouncement=()=>{
        startChangeCurrentAnnouncement({title:"",price:"",type:"Comida",description:"",lat:4.579058837323484, lon:-74.15828726231138});
        startOpenAnnouncement()
    }

  return (
    <div className="row border-0  d-flex justify-content-between align-items-center gap-4 prodlist">

        {status === "authenticated" ? (
            <button className="btn btn-success mt-2" onClick={onNewAnnouncement}>
            Publicar anuncio
            </button>
        ) : (
            ""
        )}

        {
            announcements.map((announcement)=>{
                return (
                    <AnnouncementCard key={announcement._id} announcement={announcement}/>
                )
            })
        }
            
        
        
    </div>
  )
}
