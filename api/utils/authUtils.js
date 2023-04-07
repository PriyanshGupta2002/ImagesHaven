import bcrypt from 'bcryptjs'
export const hashPass=(password)=>{
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(password, salt);
return hash;
}

export const verifyHashPassword=(currentUserPassword,passwordFromDb)=>{
    return bcrypt.compareSync(currentUserPassword,passwordFromDb)
}