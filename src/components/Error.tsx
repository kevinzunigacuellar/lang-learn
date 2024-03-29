/** @jsxImportSource solid-js */

// This is a reusable error component that can be used to display errors from the server
export default function Error({ message }: { message?: string[] | string }) {
  return <p class="text-red-500 text-sm -mt-1">{message}</p>;
}
