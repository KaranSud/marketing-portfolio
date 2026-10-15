import Aurora from "./Aurora";

export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <Aurora />
      <div className="ambient-grain" />
    </div>
  );
}
