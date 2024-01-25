import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const templateContent = fs.readFileSync(
    path.resolve("./template.hbs"),
    "utf-8"
  );
  const template = handlebars.compile(templateContent);
  const compiledTemplate = template({
    ...req.body,
    date: req.body.createdAt
      ? req.body.createdAt.toLocaleDateString("pt-BR")
      : new Date().toLocaleDateString("pt-BR"),
    hours: req.body.createdAt
      ? req.body.createdAt.toLocaleTimeString("pt-BR")
      : new Date().toLocaleTimeString("pt-BR"),
  });

  res.status(200).send(compiledTemplate);
}
