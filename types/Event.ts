export type EventDraft = {
  id: string;
  title: string;
  when?: string; // ISO or human text
  where?: string; // URL or address or "In-person (HTW)" / "Online"
  description: string;
  checklist: string[]; // 3 concise items
  members: { id: string; name: string; role: string }[];
  createdAt: number;
};