export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <span className="footer-name">Karan Sud</span>
        <span className="footer-tag">
          &copy; {new Date().getFullYear()} Brands don&rsquo;t go viral.
          Systems do.
        </span>
      </div>
    </footer>
  );
}
