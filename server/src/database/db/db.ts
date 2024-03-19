import mongoose from "mongoose";
import config from "../../utils/envConfig";

/*
  0 = Disconnected
  1 = Connected
  2 = Connecting
  3 = Disconnecting
*/

export const mongoConnection = {
  isConnected: 0
}

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log('Hay conexión');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log('Usando conexión anterior');

    }
    await mongoose.disconnect();
  }

  await mongoose.connect(config.mongoUrl);
  mongoConnection.isConnected = 1;
  console.log('Conectado a mongoDB');
}

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return;

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected === 0;

  console.log('Desconectado de MongoDB');
}
