import { cache } from "react";
import { db } from "@/db";

export const getCoursers = cache(async () => await db.query.courses.findMany());
