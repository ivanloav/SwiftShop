export const OpenInNewWindow = (url, width, height) => {
  const features = `width=${width},height=${height},scrollbars=yes,resizable=yes`;
  window.open(url, "_blank", features);
};
