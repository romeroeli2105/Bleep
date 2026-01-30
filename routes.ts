import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.songs.search.path, async (req, res) => {
    const query = req.query.q as string;
    if (!query) return res.json([]);
    
    // In a real app, we'd proxy to iTunes here or check DB
    // For now, let's just return what's in our storage or an empty list
    const results = await storage.searchSongs(query);
    res.json(results);
  });

  app.post(api.songs.bleep.path, async (req, res) => {
    try {
      const input = api.songs.bleep.input.parse(req.body);
      
      // Simulate finding a clean version
      const cleanSong = await storage.createSong({
        trackName: input.trackName,
        artistName: input.artistName,
        artworkUrl: input.artworkUrl.replace("explicit", "clean"), // mock logic
        isExplicit: false,
      });
      
      res.json(cleanSong);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
