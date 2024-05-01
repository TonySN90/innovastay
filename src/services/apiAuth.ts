import supabase from "./supabase";

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

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

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

export async function signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  console.log(fullName, email, password);

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
