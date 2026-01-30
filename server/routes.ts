import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import * as fs from "fs";
import * as path from "path";

interface DataJson {
  profile: any;
  experiences: any[];
  education: any[];
  projects: any[];
  skills: any[];
}

function loadData(): DataJson {
  const dataPath = path.join(process.cwd(), "data.json");
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Profile
  app.get(api.profile.get.path, async (_req, res) => {
    const data = loadData();
    if (!data.profile) return res.status(404).json({ message: "Profile not found" });
    res.json(data.profile);
  });

  // Experience
  app.get(api.experiences.list.path, async (_req, res) => {
    const data = loadData();
    res.json(data.experiences || []);
  });

  // Education
  app.get(api.education.list.path, async (_req, res) => {
    const data = loadData();
    res.json(data.education || []);
  });

  // Projects
  app.get(api.projects.list.path, async (_req, res) => {
    const data = loadData();
    res.json(data.projects || []);
  });

  // Skills
  app.get(api.skills.list.path, async (_req, res) => {
    const data = loadData();
    res.json(data.skills || []);
  });

  return httpServer;
}
