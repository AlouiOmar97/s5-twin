const yup = require("yup");
const validate = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            Phone: yup.number().required(),
        });
        await schema.validate(req.params, { abortEarly: false });
        next();
    } catch (error) {
        res.status(400).json({
            error: error.errors,
        });
    }
};
module.exports = validate;