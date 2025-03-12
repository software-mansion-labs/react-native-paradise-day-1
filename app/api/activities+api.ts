import { activities } from "@/constants/data";

export function GET() {
  return Response.json(activities);
}
