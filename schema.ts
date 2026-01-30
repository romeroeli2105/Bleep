import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  trackName: text("track_name").notNull(),
  artistName: text("artist_name").notNull(),
  artworkUrl: text("artwork_url").notNull(),
  isExplicit: boolean("is_explicit").default(false),
  cleanTrackId: text("clean_track_id"), // Reference to a clean version if found
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSongSchema = createInsertSchema(songs).omit({ id: true, createdAt: true });

export type Song = typeof songs.$inferSelect;
export type InsertSong = z.infer<typeof insertSongSchema>;

export type BleepRequest = {
  trackName: string;
  artistName: string;
  artworkUrl: string;
};

export type BleepResponse = {
  success: boolean;
  cleanVersion?: Song;
  message?: string;
};
