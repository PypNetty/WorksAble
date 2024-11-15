export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: "candidate" | "employer";
}
