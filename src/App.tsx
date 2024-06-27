import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { useState, useEffect } from "react";
import { supabase } from "./services/supabaseClient";
import Auth from "./Auth.tsx";
import Account from "./Account.tsx";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <MantineProvider>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </MantineProvider>
  );
}

export default App;
