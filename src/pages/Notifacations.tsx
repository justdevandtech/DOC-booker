import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useAppSelector } from "../app/hooks";
import { IoMdCloseCircle } from "react-icons/io";

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
                      rounded={"md"}
                      w={"100%"}
                      display={"flex"}
                      alignItems='center'
                      justifyContent='space-between'
                      mt={2}
                      key={index}
                    >
                      <Text cursor='pointer'>{notification.message}</Text>
                      <Box cursor='pointer'>
                        <IoMdCloseCircle color='red' />
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            ) : (
              <Box>No unseen notification</Box>
            )}
          </TabPanel>
          <TabPanel>
            {user?.seenNotification.length > 0 ? (
              <Box>
                {user?.seenNotification.map(
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
              <Box>No notification</Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
