
export const OpenInNewWindow = (url) => {
    const features = "width=600,height=600,scrollbars=yes,resizable=yes";
    window.open(url, "_blank", features);
}