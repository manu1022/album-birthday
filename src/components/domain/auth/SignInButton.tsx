import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useAuth } from "~/lib/firebase";
import SpotifyLogin from "~/lib/spotify";

export const SignInButton = () => {
  const handleClick = () => {

      // console.log("HOLA")
      // fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
      // fetch("https://api.spotify.com/v1/me", {
      //   method: "GET",
      //   headers: {
      //     Authorization: `Bearer e476f46fccba4586ab13915c5855f8d4`
      //   }
      // })
      // .then(response => response.json())
      // .then(({beats}) => {
      //   console.log("BEATS", Response)
      //   beats.forEach((beat, index) => {
      //     console.log(`Beat ${index} starts at ${beat.start}`);
      //   })
      // })

    // const provider = new GoogleAuthProvider();
    // const auth = useAuth();
    // // @see https://firebase.google.com/docs/auth/web/google-signin
    // auth.languageCode = "en";
    SpotifyLogin();
    // signInWithRedirect(auth, provider);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-primary normal-case min-w-60"
    >
      Sign In With Spotify
    </button>
  );
};
