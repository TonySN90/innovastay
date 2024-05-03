import supabase, { supabaseUrl } from "./supabase";

// Login
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

// Logout
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

// Ger User
export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data?.user;
}

// Signup
export async function signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

// Update User
export async function updateUser({
  password,
  fullName,
  avatar,
}: {
  password: string;
  fullName: string;
  avatar: string;
}) {
  // 1. Update password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      data: {
        full_name: fullName,
      },
    };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // 2. Upload Avatar
  const fileName = `avatar-${Math.random()}-${avatar.name}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    console.log(storageError);
    throw new Error(storageError.message);
  }

  // 3. Update Avatar
  const { data: updatedUser, error: userError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (userError) {
    console.log(userError);
    throw new Error(userError.message);
  }

  return updatedUser;
}
