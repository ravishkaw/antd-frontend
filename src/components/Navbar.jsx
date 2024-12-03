import { Drawer, Flex, Button, ConfigProvider, Menu } from "antd";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 576;
      setIsSmallScreen(isMobile);

      // Close the Drawer if resizing to desktop view
      if (!isMobile) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "none",
            defaultBorderColor: "none",
            colorText: "white",
            defaultHoverBg: "none",
            defaultHoverColor: "#e1e1e1",
            defaultActiveBg: "none",
            defaultActiveBorderColor: "none",
            defaultActiveColor: "#e1e1e1",
          },
        },
      }}
    >
      <Flex align="center" justify="space-between">
        <h1>Navbar</h1>

        {!isSmallScreen ? (
          <AppMenu />
        ) : (
          <Button onClick={openDrawer} size="large">
            <FaBars />
          </Button>
        )}

        <Drawer
          open={open}
          onClose={closeDrawer}
          closable={false}
          width="250px"
          styles={{
            body: {
              backgroundColor: "#001529",
              color: "white",
            },
          }}
        >
          <AppMenu isInline />
        </Drawer>
      </Flex>
    </ConfigProvider>
  );
};
export default Navbar;

const AppMenu = ({ isInline = false }) => {
  return (
    <Menu
      mode={isInline ? "inline" : "horizontal"}
      theme="dark"
      items={[
        {
          label: "Home",
          key: "home",
        },
        {
          label: "About",
          key: "about",
        },
      ]}
    >
    </Menu>
  );
};
