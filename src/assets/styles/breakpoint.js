const size = {
  iphone: "375px",
  ipadmini: "768px",
  desktop: "1152px",
};

const device = {
  iphone: `(min-width: ${size.iphone})`,
  ipadmini: `(min-width: ${size.ipadmini})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default { size, device };
