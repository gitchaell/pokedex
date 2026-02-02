import { Logger } from "@nestjs/common";
import { app } from "./server";

(async () => {
	const port = 3000;
	const server = await app();
	await server.listen(port, () => {
		Logger.log(
			`Nest aplication running in http://localhost:${port}/graphql`,
			"NestApplication",
		);
	});
})();
