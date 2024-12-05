const FooterContainer = () => {
  return <div style={footerStyle}>©{new Date().getFullYear()}</div>;
};
export default FooterContainer;

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  // backgroundColor: "#001529",
  height: 48,
  lineHeight: "48px",
};
