import { Logger } from "@nestjs/common";
import { app } from "./server";

(async () => {
	const port = parseInt(process.env.PORT || "3000", 10);
	const server = await app();
	await server.listen(port, () => {
		Logger.log(
			`Nest application running in http://localhost:${port}/graphql`,
			"NestApplication",
		);
	});
})();
