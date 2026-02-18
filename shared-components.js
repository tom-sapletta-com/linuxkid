/* ───── LinuxKid Shared React Components ───── */
/* Include via <script> before mission JSX. Requires React. */

window.CopyCode = function CopyCode({ text }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return React.createElement("button", {
    className: "copy-code-btn" + (copied ? " copied" : ""),
    onClick: copy,
    title: "Kopiuj do schowka"
  }, copied ? "✅" : "📋");
};
