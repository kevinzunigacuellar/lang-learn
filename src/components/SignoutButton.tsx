/** @jsxImportSource solid-js */

export default function SignoutButton() {
  async function signout() {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    // error handling
    if (!response.ok) {
      console.error("Failed to sign out", response);
    }
    if (response.redirected) {
      window.location.assign(response.url);
    }
  }

  // HTML for the signout button
  return (
    <button
      class="border border-transparent text-white font-medium bg-violet-500 hover:bg-transparent hover:border-violet-500 hover:text-violet-700 transition-all px-4 py-1 rounded-md"
      type="button"
      onClick={signout}
    >
      Sign out
    </button>
  );
}
