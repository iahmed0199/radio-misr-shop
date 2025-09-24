import { loadEnv, defineConfig } from '@medusajs/framework/utils'

export default defineConfig({
  projectConfig: {
    // Worker mode configuration  
    workerMode: process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server",
    
    // Database connections - Supabase compatible
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    
    // HTTP configuration
    http: {
      storeCors: process.env.STORE_CORS?.split(",") || [],
      adminCors: process.env.ADMIN_CORS?.split(",") || [], 
      authCors: process.env.AUTH_CORS?.split(",") || [],
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  
  // Admin dashboard configuration
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },
  
  // Enhanced modules for Supabase PostgreSQL
  modules: [
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis", 
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
    {
      resolve: "@medusajs/medusa/locking",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/locking-redis",
            id: "locking-redis",
            is_default: true,
            options: {
              redisUrl: process.env.REDIS_URL,
            },
          },
        ],
      },
    },
  ]
})

