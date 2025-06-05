interface Body {
  name: string;
  email: string;
  password?: string | null;
}

export interface AccountUpdateRequest {
  body: Body;
}
