import { redirect } from "next/navigation";

// The Flow preview became the home page.
export default function FlowRedirect() {
  redirect("/");
}
