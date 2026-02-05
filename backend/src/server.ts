import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExpressAdapter } from "@nestjs/platform-express";

export const app = async (expressInstance?: any) => {
	const app = await NestFactory.create(
		AppModule,
		expressInstance ? new ExpressAdapter(expressInstance) : undefined,
	);
	// Allow only specific origins: hosting domains and localhost for dev
	const allowedOrigins = [
		// Firebase Hosting domains for the project
		"https://pokedex-premium.web.app",
		"https://pokedex-premium.firebaseapp.com",
		// Local development origins
		"http://localhost:4200",
		"http://localhost:3000",
		"http://127.0.0.1:4200",
		"http://127.0.0.1:3000",
	];

	app.enableCors({
		origin: (origin, callback) => {
			// Allow requests with no origin (like curl, server-side)
			if (!origin) return callback(null, true);
			if (allowedOrigins.includes(origin)) {
				return callback(null, true);
			}
			return callback(new Error("Origin not allowed by CORS"));
		},
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 204,
	});
	return app;
};
