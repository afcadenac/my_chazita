
const getdaysdifference=(initialDate)=>{
    const currentDate=new Date();

    let difference=currentDate-initialDate;

    difference=difference/1000;
    difference=difference/60;
    difference=difference/60;
    difference=difference/24;

    return difference;
}

export const getFilteredChazas= (filter={},chazaFilter=[]) => {

    if(filter.name.length>0){
        chazaFilter=chazaFilter.filter((chaza)=>{
            if(chaza.name.toLowerCase().includes(filter.name.toLowerCase())===true){
                return chaza;
            }
        });
    }

    switch (filter.order) {
        case "Ascendente":
            chazaFilter=chazaFilter.sort((x, y) => x.name.localeCompare(y.name));
            break;

        case "descendente":
            chazaFilter=chazaFilter.sort((x, y) => x.name.localeCompare(y.name)).reverse();
            break;
    
        default:
            break;
    }

    switch (filter.punctuation) {
        case "mayor a 1":
            chazaFilter=chazaFilter.filter((chaza)=>chaza.punctuation>1);
            break;

        case "mayor a 2":
            chazaFilter=chazaFilter.filter((chaza)=>chaza.punctuation>2);
            break;
        
        case "mayor a 3":
            chazaFilter=chazaFilter.filter((chaza)=>chaza.punctuation>3);
            break;

        case "mayor a 4":
            chazaFilter=chazaFilter.filter((chaza)=>chaza.punctuation>4);
            break;

        case "sobre a 5":
            chazaFilter=chazaFilter.filter((chaza)=>chaza.type===5);
            break;

        default:
            break;
    }

    switch (filter.date) {
        case "menos de un mes":
            chazaFilter=chazaFilter.filter((chaza)=>getdaysdifference(new Date(chaza.date))<30);
            break;

        case "entre 1 a 6 meses":
            chazaFilter=chazaFilter.filter((chaza)=>getdaysdifference(new Date(chaza.date))>=30 && getdaysdifference(new Date(chaza.date))<=182);
            break;
        
        case "entre 6 meses a un año":
            chazaFilter=chazaFilter.filter((chaza)=>cgetdaysdifference(new Date(chaza.date))>=182 && getdaysdifference(new Date(chaza.date))<=365);
            break;

        case "mas de un años":
            chazaFilter=chazaFilter.filter((chaza)=>getdaysdifference(new Date(chaza.date))>365);
            break;

        default:
            break;
    }

    return chazaFilter;
}
