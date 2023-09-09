
export const convertToVector=(currentValue={})=>{
    let vector=[];

    for (const valueKey of Object.keys(currentValue)) {
        if(valueKey==="_id" || valueKey==="chaza" || valueKey==="__v" || valueKey==="photo" ) continue
        
        vector.push({
            name:valueKey,
            value:currentValue[valueKey]
        });
    }
    return vector;
}