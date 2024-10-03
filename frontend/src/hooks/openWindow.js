export const OpenInNewWindow = (url) => {
  const features = "width=800,height=700,scrollbars=yes,resizable=yes";
  window.open(url, "_blank", features);
};
