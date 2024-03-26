import Storage from "react-native-encrypted-storage";
export interface AuthService {
  setToken(token: string): Promise<void>;
  getToken(): Promise<string | null>;
  isAuthenticated(): Promise<boolean>;
}
const authService: AuthService = {
  setToken: async (token: string) => {
    Storage.setItem("token", token);
  },
  getToken: async () => {
    const token = await Storage.getItem("token");
    return token;
  },
  isAuthenticated: async function () {
    const token = await this.getToken();
    return !!token;
  },
};
export default authService;
