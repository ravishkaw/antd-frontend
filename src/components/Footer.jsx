const Footer = () => {
  return (
    <div style={footerStyle}>
      ©{new Date().getFullYear()} 
    </div>
  );
};
export default Footer;

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#001529",
  height: 64,
  lineHeight: "64px",
};
