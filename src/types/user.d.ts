export type User = {
  id: string,
  email: string,
  role: 'user' | 'admin',
  createdAt: string,
  updatedAt: string,
  name?: string,
  surname?: string,
  img?: string,
};
