const isValidFaceitId = async (req, res, next) => {
  if (
    req.params.id.match(
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/g
    )
  ) {
    await next();
  } else {
    await next({ status: 404 });
  }
};

module.exports = isValidFaceitId;
