import { supabase } from '../config/supabase';

export const signUp = async (email, password, username) => {
  try {
    // First, sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (!authData?.user) {
      throw new Error('Signup failed: No user data received');
    }

    // Wait a short moment to ensure the auth record is created
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create user profile in the database using service role (bypasses RLS)
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: email,
        username: username,
        coins: 0
      });

    if (profileError) {
      console.error('Error creating user profile:', profileError);
      // Try to delete the auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw new Error(`Failed to create user profile: ${profileError.message}`);
    }

    return authData;
  } catch (error) {
    console.error('SignUp error:', error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const resetPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
};

export const updatePassword = async (newPassword) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session?.user || null;
};

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
}; 