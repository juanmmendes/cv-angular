import 'zone.js/node';
import express from 'express';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export function app(): express.Express {
  const server = express();
  const distFolder = join(__dirname, 'dist/portfolio/browser');
  const indexHtml = join(distFolder, 'index.html');

  server.use(express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', async (req, res) => {
    const { renderApplication } = await import('@angular/platform-server');

    try {
      const html = await renderApplication(bootstrap, {
        url: req.originalUrl,
        document: indexHtml
      });
      res.status(200).send(html);
    } catch (error) {
      console.error('SSR render error', error);
      res.status(500).send('Erro interno ao renderizar a aplicação.');
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Servidor SSR ouvindo em http://localhost:${port}`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run();
}

export default app;
