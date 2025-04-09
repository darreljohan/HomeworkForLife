import supabase from "../application/database";

export class UserTest {
  static async deleteUser(userId: string) {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) {
      console.log(error);
    }
  }

  static async createUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
    }

    return data;
  }

  static async loginUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
    }

    return data;
  }
}
