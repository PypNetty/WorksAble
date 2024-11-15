export interface User {
  id: string;
  email: string;
  name: string;
  role: "candidate" | "employer";
  profileId?: string;
}
