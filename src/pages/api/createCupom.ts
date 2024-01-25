import type { NextApiRequest, NextApiResponse } from "next";
import handlebars from "handlebars";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
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

const templateContent = `<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Document</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap"
    rel="stylesheet"
  />
  <style>
    * { font-family: "Courier Prime"; }
  </style>
</head>
<body class="w-full h-[100mm] gap-2 px-2 mt-10 flex flex-col">
  <header class="flex justify-center items-center">
    <h1 class="font-bold mb-5">Açougue Oliveira</h1>
  </header>
  <hr class="border-black" />
  <div class="flex justify-center">
    <span class="text-sm font-bold"> Resumo do pedido </span>
  </div>
  <hr class="border-black" />
  <div class="flex gap-10">
    <span class="text-sm font-bold">Data: {{date}}</span>
    <span class="text-sm font-bold">Hora: {{hours}}</span>
  </div>
  <span class="text-sm font-bold">Cliente: {{clientName}}</span>
  <span class="text-sm font-bold"> Endereço: {{address}}</span>
  <span class="text-sm font-bold">Telefone: {{phone}}</span>
  <span class="text-sm font-bold"> Pagamento: {{paymentMethod}}</span>
  <span class="text-sm font-bold">Observações: {{note}}</span>
  <hr class="border-black" />
  <div class="flex justify-center items-center">
    <h2 class="font-bold text-sm">Itens</h2>
  </div>
  <hr class="border-black" />
  <table>
    <thead>
      <tr class="[&>th]:text-start [&>th]:text-sm">
        <th class="pr-3">Qtd.</th>
        <th class="w-full">Produto</th>
      </tr>
    </thead>
    <tbody>
      {{#each items}}
        <tr class="[&>th]:text-start [&>th]:text-sm">
          <th>{{this.quantity}}</th>
          <th>{{this.productName}}</th>
        </tr>
      {{/each}}
    </tbody>
  </table>
</body>
</html>`;
