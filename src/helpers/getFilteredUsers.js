export const getFilteredUsers= (filter={},userFilter=[]) => {

    if(filter.name.length>0){
        console.log(filter.name);
        userFilter=userFilter.filter((user)=>{
            if(user.email.toLowerCase().includes(filter.name.toLowerCase())===true){
                return user;
            }
        });
    }

    switch (filter.order) {
        case "Ascendente":
            userFilter=userFilter.sort((x, y) => x.name.localeCompare(y.name));
            break;

        case "descendente":
            userFilter=userFilter.sort((x, y) => x.name.localeCompare(y.name)).reverse();
            break;
    
        default:
            break;
    }

    switch (filter.type) {
        case "Cliente":
            userFilter=userFilter.filter((user)=>user.type==="Cliente");
            break;

        case "Dueño":
            userFilter=userFilter.filter((user)=>user.type==="Dueño");
            break;
    
        default:
            break;
    }

    return userFilter;
}
