export interface Profile {
  id: string;
  userId: string;
  title: string;
  skills: string[];
  about: string;
  rqthStatus: boolean;
  accommodations?: {
    type: string;
    description: string;
  }[];
  preferences: {
    workType: "remote" | "office" | "hybrid";
    location?: string;
    schedule?: string;
  };
}
