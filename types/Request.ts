export type CollabRequest = {
  id: string;
  fromId: string;
  toId: string;
  mode: "Online" | "In-person (Honolulu Tech Week)";
  status: "pending" | "accepted" | "rejected";
  createdAt: number;
};