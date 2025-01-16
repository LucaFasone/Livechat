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
      console.error(`Errore nel recupero del refresh token per userId: ${userId}`, error);
      throw new Error('Errore nella comunicazione con Redis');
    }
  },

  saveRefreshToken: async (userId: string, refreshToken: string) => {
    try {
      console.log(typeof userId);
      await redisClient.set(userId, refreshToken, { EX: 7 * 24 * 60 * 60 });
      console.log(`Refresh token salvato per userId: ${userId}`);
    } catch (error) {
      console.error(`Errore nel salvataggio del refresh token per userId: ${userId}`, error); 
      throw new Error('Errore nella comunicazione con Redis');
    }
  },

  deleteRefreshToken: async (userId: string) => {
    try {
      await redisClient.del(userId);
      console.log(`Refresh token eliminato per userId: ${userId}`);
    } catch (error) {
      console.error(`Errore nell'eliminazione del refresh token per userId: ${userId}`, error);
      throw new Error('Errore nella comunicazione con Redis');
    }
  },
};
