
export enum ContentType {
  BIBLE_VERSE = 'bible_verse',
  INSPIRATIONAL_QUOTE = 'inspirational_quote'
}

export interface DailyInspiration {
  content: string;
  reference: string;
  type: ContentType;
  reflection: string;
  tags: string[];
}

export interface ScheduledPost extends DailyInspiration {
  id: string;
  scheduledAt: string; // ISO string
}

export interface AppState {
  current: DailyInspiration | null;
  loading: boolean;
  error: string | null;
  history: DailyInspiration[];
  scheduledPosts: ScheduledPost[];
}
