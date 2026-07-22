const parseOrderId = (req, res, next) => {
    const orderId = Number(req.params.id);

    if (!Number.isInteger(orderId) || orderId <= 0) {
        return res.status(400).json({
            message: "order ID must be a positive integer"
        });
    }

    req.orderId = orderId;
    next();
};

export default parseOrderId