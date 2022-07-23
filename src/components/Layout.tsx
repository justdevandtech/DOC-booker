import { Box } from "@chakra-ui/react";
import { Main } from "./mainContainer/Main";
import { Sidebar } from "./sidebar/Sidebar";

export const Layout = () => {
  const styles: React.CSSProperties | undefined = {
    display: "flex",
    width: "100%",
    height: "100vh",
    position: "relative",
  };

  return (
    <Box style={styles}>
      <Sidebar />
      <Main />
    </Box>
  );
};
