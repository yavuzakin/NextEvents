function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      res.status(401).json({
        status: "fail",
        message: "Bad request",
      });
      return;
    }
    res.status(201).json({
      status: "success",
      data: {
        email,
      },
    });
  }
}

export default handler;
