import mongoose from "mongoose";

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const connect = async () => {
	return await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.bfma9.mongodb.net/?retryWrites=true&w=majority`);
};

