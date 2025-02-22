import { get } from 'http';
import Redis from 'redis';

//{url: urlToRedis} in production
const redisClient = Redis.createClient();
redisClient.connect();

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

export const redisFunctions = {
  getRefreshToken: async (userId: string) => {
    try {
      const refreshToken = await redisClient.get(userId.toString());
      return refreshToken !== null
    } catch (error) {
      throw new Error('Errore nella comunicazione con Redis');
    }
  },

  saveRefreshToken: async (userId: string, refreshToken: string) => {
    try {
      await redisClient.set(userId, refreshToken, { EX: 7 * 24 * 60 * 60 });
    } catch (error) {
      throw new Error('Errore nella comunicazione con Redis');
    }
  },

  deleteRefreshToken: async (userId: string) => {
    try {
      await redisClient.del(userId);
    } catch (error) {
      throw new Error('Errore nella comunicazione con Redis');
    }
  },
  saveResetPasswordToken: async (userId: string, resetPasswordToken: string) => {
    try {
      await redisClient.set(userId, resetPasswordToken, { EX: 10 * 60 });
    } catch (error) {
      throw new Error('Errore nella comunicazione con Redis');
    }
  },
  isRefreshPasswordTokenValid: async (userId: string) => {
    try {
      const resetPasswordToken = await redisClient.get(userId.toString());
      return resetPasswordToken !== null
    } catch (error) {
      throw new Error('Errore nella comunicazione con Redis');
    }
  }


};
