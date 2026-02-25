import { Elysia } from "elysia";
import ejs from 'ejs'

const app = new Elysia()
  .onAfterHandle(({response, set }) => {
    if (typeof response === 'string' && response.trim().startsWith('<')) {
      set.headers['content-type'] = 'text/html; charset=utf-8';
    }

    return response;
  })
  .get("/", () => "Hi Elysia")
  .get("/home", async () => {
    const html = await ejs.renderFile('views/home.ejs', { name: 'Elysia' });
    return html
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
