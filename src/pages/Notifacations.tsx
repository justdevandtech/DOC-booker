import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useAppSelector } from "../app/hooks";

export const Notifacations = () => {
  const { user } = useAppSelector(state => state.auth);
  return (
    <Box mt={3}>
      <Heading as='h1' size='lg'>
        Notifications
      </Heading>
      <Tabs mt={3} size='md' variant='enclosed'>
        <TabList>
          <Tab>Unseen</Tab>
          <Tab>Seen</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* user notification not less than one and map */}
            {user?.unseenNotification.length > 0 ? (
              <Box>
                {user?.unseenNotification.map(
                  (notification: any, index: number) => (
                    <Box
                      bg={"white"}
                      border='1px'
                      borderColor={"#eaeaea"}
                      p={3}
                      rounded={"sm"}
                      w={"100%"}
                      cursor='pointer'
                      key={notification.id}
                    >
                      {notification.message}{" "}
                    </Box>
                  )
                )}
              </Box>
            ) : (
              <Box>No unseen notification</Box>
            )}
          </TabPanel>
          <TabPanel>Seen Notifications</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
