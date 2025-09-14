export const validateRequestBody = (schema) => {
    return async (req ,res , next)=> {
        try{
            console.log("validate the request body log-first")
            await schema.parseAsync(req.body)
            console.log('request body is validated succcessfully log-second');
        }catch(error){
            console.log("request body is invalid")
            res.status(400).json({
            success:false,
            message: "invalid schema",
            error:error
           })
        }
        next();
    }
}