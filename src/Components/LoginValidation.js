function validation(values){
    alert("")
    let error={}
    
    if (values.User_Name ===""){
        error.User_Name = "User name should not be empty"
    }else{
        error.User_Name = "User_Name did not match"
    }

    if (values.password ===""){
        error.password = "User name should not be empty"
    }else{
        error.password = "User_Name did not match"
    }
}

export default validation