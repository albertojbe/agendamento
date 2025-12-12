module.exports = (err, req, res, next) => {
    console.log('chegou no middleware')
    console.error(err);

    if (err.statusCode) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    res.status(500).json({
        status: "error",
        message: err.message || "Internal Server Error",
    });
};
