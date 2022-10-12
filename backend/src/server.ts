import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { adParser } from "./domain/ad/ad-parser";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient({ log: ["query"] });

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  // TODO: Zod validation

  const adCreated = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return res.status(201).json(adParser(adCreated));
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: { gameId },
    orderBy: { createdAt: "desc" },
  });

  const parsedAds = ads.map(adParser);

  return res.json(parsedAds);
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad: { discord: string } = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: { id: adId },
  });

  return res.json({ discord: ad.discord });
});

app.listen(3333);
