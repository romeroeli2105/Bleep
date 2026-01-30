import { db } from "./db";
import {
  songs,
  type Song,
  type InsertSong,
} from "@shared/schema";
import { eq, ilike, or } from "drizzle-orm";

export interface IStorage {
  getSongs(): Promise<Song[]>;
  searchSongs(query: string): Promise<Song[]>;
  createSong(song: InsertSong): Promise<Song>;
  getSongByArtistAndTitle(artist: string, title: string): Promise<Song | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getSongs(): Promise<Song[]> {
    return await db.select().from(songs);
  }

  async searchSongs(query: string): Promise<Song[]> {
    return await db.select().from(songs).where(
      or(
        ilike(songs.trackName, `%${query}%`),
        ilike(songs.artistName, `%${query}%`)
      )
    );
  }

  async getSongByArtistAndTitle(artist: string, title: string): Promise<Song | undefined> {
    const [song] = await db.select().from(songs).where(
      eq(songs.artistName, artist)
    ).where(eq(songs.trackName, title));
    return song;
  }

  async createSong(insertSong: InsertSong): Promise<Song> {
    const [song] = await db.insert(songs).values(insertSong).returning();
    return song;
  }
}

export const storage = new DatabaseStorage();
