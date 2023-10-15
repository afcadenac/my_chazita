import { getdaysdifference } from "./getFilteredChazas";


export const getFilteredAnnouncements = (filter={},announcementFilter=[]) => {
    if(filter.name.length>0){
        console.log(filter.name.length)
        announcementFilter=announcementFilter.filter((announcements)=>{
            if(announcements.title.toLowerCase().includes(filter.name.toLowerCase())===true){
                return announcements;
            }
        });
    }

    switch (filter.order) {
        case "Ascendente":
            announcementFilter=announcementFilter.sort((x, y) => x.title.localeCompare(y.title));
            break;

        case "descendente":
            announcementFilter=announcementFilter.sort((x, y) => x.title.localeCompare(y.title)).reverse();
            break;
    
        default:
            break;
    }

    switch (filter.date) {
        case "menos de un mes":
            announcementFilter=announcementFilter.filter((announcement)=>getdaysdifference(new Date(announcement.date))<30);
            break;

        case "entre 1 a 6 meses":
            announcementFilter=announcementFilter.filter((announcement)=>getdaysdifference(new Date(announcement.date))>=30 && getdaysdifference(new Date(announcement.date))<=182);
            break;
        
        case "entre 6 meses a un año":
            announcementFilter=announcementFilter.filter((announcement)=>getdaysdifference(new Date(announcement.date))>=182 && getdaysdifference(new Date(announcement.date))<=365);
            break;

        case "mas de un años":
            announcementFilter=announcementFilter.filter((announcement)=>getdaysdifference(new Date(announcement.date))>365);
            break;

        default:
            break;
    }

    switch (filter.type) {
        case "Comida":
            announcementFilter=announcementFilter.filter((announcement)=>announcement.type==="Comida");
            break;

        case "Objetos perdidos":
            announcementFilter=announcementFilter.filter((announcement)=>announcement.type==="Objetos perdidos");
            break;

        case "Eventos":
            announcementFilter=announcementFilter.filter((announcement)=>announcement.type==="Eventos");
            break;

        case "informativo":
            announcementFilter=announcementFilter.filter((announcement)=>announcement.type==="informativo");
            break;

        case "Otros":
            announcementFilter=announcementFilter.filter((announcement)=>announcement.type==="Otros");
            break;
    
        default:
            break;
    }

    return announcementFilter;
}
