export const validateRequestBody = (schema) => {
    return async (req ,res , next)=> {
        try{
            console.log("validate the request body")
            await schema.parseAsync(req.body)
            console.log('request body is validated succcessfully');
            next();
        }catch(error){
            console.log("request body is invalid")
            res.status(400).json({
            success:false,
            message: "invalid schema",
            error:error.message
           })
        }
    }
}