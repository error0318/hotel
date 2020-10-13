import instance from "@/http/http";
import {SUCCESS} from "@/lib/base";

function categoryAdd() {

}
function  categoryShow() {
    return new Promise((resolve, reject) =>{
        instance.get('/admin/category/show').then(res=>{
            if(res.code === SUCCESS) {
                resolve(res.data);
            }
        }).catch((error)=>{
            reject(error);
        })
    })

}
function categoryUpdate() {
    
}
function categoryShowAll() {
    
}
function categoryDelete() {

}
export {categoryAdd, categoryShow, categoryShowAll, categoryDelete, categoryUpdate}