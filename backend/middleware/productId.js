const parseProductId = (req, res, next) => {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
            message: "Product ID must be a positive integer"
        });
    }

    req.productId = productId;
    next();
};

export default parseProductId