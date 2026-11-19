import mongoose from 'mongoose';

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.DB_HOST, {
            dbName: "db-contacts"
        });
        console.log("Connected database:", mongoose.connection.name);
        console.log("Database connection successful");
    } catch (error) {
        console.error(error.message);
        process.exit(1);

    }
}

export default connectMongoDB