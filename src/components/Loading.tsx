
import { Box, Spinner } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Box display={'flex'} mx='auto' alignItems={'center'} height='80vh' top={'0'} bottom='0' justifyContent='center'>
      <Spinner
        thickness='4px'
        speed='0.40s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Box>
  );
}

