// called when the signout button is clicked
export default function SignoutButton() {
  async function signout() {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    // error handling
    if (!response.ok) {
      throw new Error("Error signing out");
    }
    if (response.redirected) {
      window.location.assign(response.url);
    }
  }

  // HTML for the signout button
  return (
    <button
      class="bg-indigo-400 font-medium hover:bg-indigo-400 px-4 py-1 rounded-md"
      type="button"
      onClick={signout}
    >
      Sign out
    </button>
  );
}
