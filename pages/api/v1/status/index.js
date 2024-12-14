function status(request, response) {
  response.status(200).json({ text: "olá estou retornando algo" });
}

export default status;
